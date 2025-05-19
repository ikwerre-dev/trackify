import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "shipping_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Helper function to execute SQL queries
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Initialize database tables if they don't exist
export async function initDb() {
  try {
    // Create shipping table
    await query(`
      CREATE TABLE IF NOT EXISTS shipping (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trackingNumber VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        lastUpdate DATETIME NOT NULL,
        estimatedDelivery VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create recipient table
    await query(`
      CREATE TABLE IF NOT EXISTS recipient (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shippingId INT UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip VARCHAR(255) NOT NULL,
        FOREIGN KEY (shippingId) REFERENCES shipping(id) ON DELETE CASCADE
      )
    `)

    // Create shipment_details table
    await query(`
      CREATE TABLE IF NOT EXISTS shipment_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shippingId INT UNIQUE NOT NULL,
        type VARCHAR(255) NOT NULL,
        contents TEXT NOT NULL,
        sender VARCHAR(255) NOT NULL,
        FOREIGN KEY (shippingId) REFERENCES shipping(id) ON DELETE CASCADE
      )
    `)

    // Create history_entry table
    await query(`
      CREATE TABLE IF NOT EXISTS history_entry (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shippingId INT NOT NULL,
        date DATETIME NOT NULL,
        location VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        FOREIGN KEY (shippingId) REFERENCES shipping(id) ON DELETE CASCADE
      )
    `)

    // Create irs_hold table
    await query(`
      CREATE TABLE IF NOT EXISTS irs_hold (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shippingId INT UNIQUE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        paymentStatus VARCHAR(255) NOT NULL,
        verificationCode VARCHAR(255),
        FOREIGN KEY (shippingId) REFERENCES shipping(id) ON DELETE CASCADE
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    throw error
  }
}

// Add these new functions for transaction handling

// Execute a query without prepared statements (for transaction commands)
export async function executeQuery(sql: string) {
  const connection = await pool.getConnection()
  try {
    const [results] = await connection.query(sql)
    return results
  } catch (error) {
    console.error("Database error:", error)
    throw error
  } finally {
    connection.release()
  }
}

// Execute a transaction with multiple queries
export async function transaction<T>(callback: (connection: mysql.Connection) => Promise<T>): Promise<T> {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    console.error("Transaction error:", error)
    throw error
  } finally {
    connection.release()
  }
}

// Call initDb when the app starts
initDb().catch(console.error)
