import mysql from "mysql2/promise"

// Create a singleton connection pool
let pool: mysql.Pool | null = null

// Get the connection pool (create it if it doesn't exist)
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "shipping_tracker",
      waitForConnections: true,
      connectionLimit: 5, // Reduced from default 10
      maxIdle: 5, // Max idle connections, equal to connectionLimit
      idleTimeout: 60000, // Close idle connections after 60 seconds
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  }
  return pool
}

// Helper function to execute SQL queries with connection management
export async function query(sql: string, params: any[] = []) {
  const pool = getPool()
  const connection = await pool.getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database error:", error)
    throw error
  } finally {
    // Always release the connection back to the pool
    connection.release()
  }
}

// Execute a transaction with multiple queries
export async function transaction<T>(callback: (connection: mysql.Connection) => Promise<T>): Promise<T> {
  const pool = getPool()
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
    // Always release the connection back to the pool
    connection.release()
  }
}

 

// Add a function to end the pool (useful for testing and cleanup)
export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}
