export function dbLogIn(email: string = "", password: string = "") {
  return `
  SELECT
    peo.id,
    peo.first_name,
    peo.last_name,
    peo.dni_type_id,
    dt.dni_type,
    dt.abbreviation,
    peo.dni,
    peo.birthdate,
    peo.email,
    peo.type_id,
    ut.user_type,
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', ph.id,
          'calling_code', calling_code,
          'number', number,
          'type_id', type_id,
          'phone_type', phone_type
        )
      )
      FROM phones AS ph
        INNER JOIN phone_types AS pt ON pt.id = type_id
      WHERE
        people_id = peo.id
    ) AS phones,
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', adr.id,
          'country_id', adr.country_id,
          'country', cou.country,
          'state_id', state_id,
          'state', state,
          'address', address,
          'zip_code', zip_code
        )
      )
      FROM addresses AS adr
        INNER JOIN countries AS cou ON cou.id = country_id
        INNER JOIN states AS sta ON sta.id = state_id
      WHERE
        people_id = peo.id
    ) AS addresses
  FROM people AS peo
    INNER JOIN users AS us ON us.id = peo.id
    INNER JOIN dni_types AS dt ON dt.id = peo.dni_type_id
    INNER JOIN user_types AS ut ON ut.id = peo.type_id
  WHERE
    peo.type_id = 1
    AND peo.email = '${email}'
    AND us.password = '${password}'
  ;
  `;
}