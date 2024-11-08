import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async function solution(articles) {
  const sql = postgres(config);

  try {
    await sql`CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255)
    )`;
    
    const ids = await sql`
      INSERT INTO articles (title, description)
      SELECT * FROM jsonb_to_recordset(${articles}) AS data(title TEXT, description TEXT)
      RETURNING id
    `;

    return ids.map((obj) => obj.id);
  } finally {
    await sql.end();
  }
}
// END
