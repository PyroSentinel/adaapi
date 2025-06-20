-- @param {Float} $1:lat
-- @param {Float} $2:lng
WITH distances AS (
  SELECT
    g.id,
    (
      6371000 * acos(
        cos(radians($1)) * cos(radians(r.latitude)) *
        cos(radians(r.longitude) - radians($2)) +
        sin(radians($1)) * sin(radians(r.latitude))
      )
    ) AS distance
  FROM "group" AS g
  JOIN "report" as r ON r.id = g.report_id
  WHERE r.latitude IS NOT NULL
    AND r.longitude IS NOT NULL
    AND g.status IS DISTINCT FROM 'completed'
)
SELECT *
FROM distances
WHERE distance < 100
ORDER BY distance
LIMIT 1;
