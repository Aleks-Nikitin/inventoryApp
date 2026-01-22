const {Client}=require("pg");
require("dotenv").config();
const SQL=` CREATE TABLE IF NOT EXISTS genres(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
genname VARCHAR(255) UNIQUE
);
CREATE TABLE IF NOT EXISTS devs(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
devname VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS games(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255) NOT NULL,
yr INTEGER,
bio TEXT,
devid  INTEGER,
CONSTRAINT fk_devs FOREIGN KEY(id) REFERENCES devs(id),
genreid INTEGER,
CONSTRAINT fk_genres FOREIGN KEY(id) REFERENCES genres(id)
);
INSERT INTO genres(genname) VALUES
('rpg'),
('strategy'),
('survival'),
('shooter'),
('moba'),
('sports');
INSERT INTO devs(devname) VALUES
('rockstar'),
('blizzard'),
('ubisoft'),
('ea'),
('nintendo');
INSERT INTO games(name,yr,bio,devid,genreid) VALUES
('nameeee',2005,'love games',2,1);
`;


async function main() {
       console.log("seeding..");
    const client = new Client({
       connectionString:process.env.DB_CON
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
 
    console.log("done")

}
main();
