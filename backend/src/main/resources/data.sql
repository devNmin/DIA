INSERT INTO authority (authority_name)
SELECT 'ROLE_USER'
FROM DUAL WHERE NOT EXISTS(SELECT * FROM authority WHERE authority_name = 'ROLE_USER');

INSERT INTO authority (authority_name)
SELECT 'ROLE_ADMIN'
FROM DUAL WHERE NOT EXISTS(SELECT * FROM authority WHERE authority_name = 'ROLE_ADMIN');