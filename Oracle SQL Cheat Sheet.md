# Oracle SQL Cheat Sheet

## Requête SELECT
```sql
SELECT col1, col2
FROM table
JOIN table2 ON table1.col = table2.col
WHERE condition
GROUP BY column_name
HAVING condition
ORDER BY col1 ASC|DESC;
```

## Mots-clés SELECT
- **DISTINCT**: Supprime les résultats en double
```sql
SELECT DISTINCT product_name FROM product;
```
- **BETWEEN**: Correspond à une valeur entre deux autres valeurs (inclusif)
```sql
SELECT product_name FROM product WHERE price BETWEEN 50 AND 100;
```
- **IN**: Correspond à l'une des valeurs d'une liste
```sql
SELECT product_name FROM product WHERE category IN ('Electronics', 'Furniture');
```
- **LIKE**: Effectue des correspondances avec des caractères génériques `_` ou `%`
```sql
SELECT product_name FROM product WHERE product_name LIKE '%Desk%';
```

## Modification des données
- **Insertion**
```sql
INSERT INTO tablename (col1, col2...) VALUES (val1, val2);
```
- **Mise à jour**
```sql
UPDATE tablename SET col1 = val1 WHERE condition;
```
- **Suppression**
```sql
DELETE FROM tablename WHERE condition;
```
- **Insertion de plusieurs lignes**
```sql
INSERT ALL
INTO tablename (col1, col2) VALUES (valA1, valB1)
INTO tablename (col1, col2) VALUES (valA2, valB2)
SELECT * FROM dual;
```

## Jointures
```sql
SELECT t1.*, t2.* FROM t1 join_type t2 ON t1.col = t2.col;
```
- **INNER JOIN**: Affiche tous les enregistrements correspondants dans les deux tables.
- **LEFT JOIN**: Affiche tous les enregistrements de la table de gauche et les enregistrements correspondants de la table de droite.
- **RIGHT JOIN**: Affiche tous les enregistrements de la table de droite et les enregistrements correspondants de la table de gauche.
- **FULL JOIN**: Affiche tous les enregistrements des deux tables, qu'il y ait correspondance ou non.

## Création de table
```sql
CREATE TABLE tablename (
  column_name data_type
);
```
### Avec contraintes
```sql
CREATE TABLE tablename (
  column_name data_type NOT NULL,
  CONSTRAINT pkname PRIMARY KEY (col),
  CONSTRAINT fkname FOREIGN KEY (col) REFERENCES other_table(col_in_other_table),
  CONSTRAINT ucname UNIQUE (col),
  CONSTRAINT ckname CHECK (conditions)
);
```
- **Suppression de table**
```sql
DROP TABLE tablename;
```

## Modification de table
- **Ajout de colonne**
```sql
ALTER TABLE tablename ADD columnname datatype;
```
- **Suppression de colonne**
```sql
ALTER TABLE tablename DROP COLUMN columnname;
```
- **Modification de colonne**
```sql
ALTER TABLE tablename MODIFY columnname newdatatype;
```
- **Renommage de colonne**
```sql
ALTER TABLE tablename RENAME COLUMN currentname TO newname;
```

## Index
- **Création d'index**
```sql
CREATE INDEX indexname ON tablename (cols);
```
- **Suppression d'index**
```sql
DROP INDEX indexname;
```

## Opérateurs d'ensemble
- **UNION**: Affiche les lignes uniques de deux ensembles de résultats.
- **UNION ALL**: Affiche toutes les lignes de deux ensembles de résultats.
- **INTERSECT**: Affiche les lignes qui existent dans les deux ensembles de résultats.
- **EXCEPT**: Affiche les lignes qui existent dans le premier ensemble de résultats mais pas dans le second.

## Fonctions analytiques/fenêtres
```sql
SELECT student_id, first_name, last_name, gender, fees_paid,
RANK() OVER (
  PARTITION BY gender ORDER BY fees_paid
) AS rank_val
FROM student;
```

## Sous-requêtes
```sql
SELECT id, last_name, salary FROM employee WHERE salary = (
  SELECT MAX(salary) FROM employee
);
```

## Instruction CASE
- **CASE simple**
```sql
CASE name
  WHEN 'John' THEN 'Name John'
  WHEN 'Steve' THEN 'Name Steve'
  ELSE 'Unknown'
END
```
- **CASE recherché**
```sql
CASE
  WHEN name = 'John' THEN 'Name John'
  WHEN name = 'Steve' THEN 'Name Steve'
  ELSE 'Unknown'
END
```

## Fonctions d'agrégation
- **SUM**: Calcule la somme des nombres fournis
- **COUNT**: Compte le nombre d'enregistrements
- **AVG**: Calcule la moyenne des nombres fournis
- **MIN**: Trouve la valeur la plus basse
- **MAX**: Trouve la valeur la plus élevée

## Fonctions courantes
- **LENGTH(string)**: Retourne la longueur de la chaîne fournie
- **INSTR(string, substring, [start_position], [occurrence])**: Trouve la position d'une sous-chaîne
- **TO_CHAR(input_value, [fmt_mask], [nls_param])**: Convertit une date/valeur numérique en chaîne
- **TO_DATE(charvalue, [fmt_mask], [nls_date_lang])**: Convertit une chaîne en date
- **TO_NUMBER(input_value, [fmt_mask], [nls_param])**: Convertit une chaîne en nombre
- **ADD_MONTHS(input_date, num_months)**: Ajoute des mois à une date
- **SYSDATE**: Retourne la date et l'heure actuelles
- **CEIL(input_val)**: Retourne l'entier supérieur le plus proche
- **FLOOR(input_val)**: Retourne l'entier inférieur le plus proche
- **ROUND(input_val, round_to)**: Arrondit un nombre
- **TRUNC(input_value, dec_or_fmt)**: Tronque un nombre ou une date
- **REPLACE(whole_string, string_to_replace, [replacement_string])**: Remplace une sous-chaîne
- **SUBSTR(string, start_position, [length])**: Extrait une partie d'une chaîne

## Expression de table commune (CTE)
```sql
WITH queryname AS (
  SELECT col1, col2 FROM firsttable)
SELECT col1, col2 FROM queryname;
```

