import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || process.env.SUPABASE_DATABASE_URL;
if (!dbUrl) {
  console.error('No DATABASE_URL found. Add DATABASE_URL (Postgres connection string) to your .env');
  process.exit(1);
}

const client = new Client({ connectionString: dbUrl });

async function main() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected. Running test query SELECT 1');
    const res = await client.query('SELECT 1 AS result');
    console.log('Test query result:', res.rows[0].result);

    const migrationsDir = path.resolve(process.cwd(), 'supabase', 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.error('Migrations directory not found:', migrationsDir);
      process.exit(1);
    }

    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    console.log('Found migrations:', files);
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      console.log('Applying', file);
      const sql = fs.readFileSync(filePath, 'utf8');
      if (!sql.trim()) {
        console.log('Skipping empty file', file);
        continue;
      }
      await client.query(sql);
      console.log('Applied', file);
    }

    console.log('All migrations applied successfully.');
  } catch (err) {
    console.error('Migration error:', err.message || err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
