use jsonwebtoken::{
    decode, encode, Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use rocket::serde::{Deserialize, Serialize};
use std::{collections::HashSet, error::Error};

use crate::domain::{
    generator::TimeGen,
    schedule::user::model::User,
    session::{Session, SessionDecodeErr, SessionEncodeErr, SessionErr, SessionService},
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct Claims {
    username: String,
    sub: String,
    aud: String,
    iss: String,
    exp: usize,
    iat: usize,
}

const SECRET: &str = "your-secret-key";

pub struct SessionServiceJWT;

impl SessionService for SessionServiceJWT {
    fn encode(&self, user: &User, time_gen: &dyn TimeGen) -> Result<Session, SessionErr> {
        let claims = Claims {
            username: user.username.clone(),
            sub: user.id.clone(),
            aud: String::from("precise_schedule_server"),
            iss: String::from("precise_schedule"),
            exp: (time_gen.gen() + 60 * 60 * 2) as usize,
            iat: time_gen.gen() as usize,
        };
        let token = encode(
            &Header::new(Algorithm::HS512),
            &claims,
            &EncodingKey::from_secret(SECRET.as_ref()),
        )
        .map_err(|_| SessionErr::Encode(SessionEncodeErr))?;
        Ok(Session { token })
    }

    fn decode(&self, session: Session) -> Result<String, SessionErr> {
        let erfohier = Validation::default();
        let mut required_claims = HashSet::with_capacity(1);
        required_claims.insert("exp".to_owned());

        let mut validation = Validation::new(Algorithm::HS512);
        validation.set_audience(&[String::from("precise_schedule_server")]);
        validation.set_issuer(&[String::from("precise_schedule")]);

        let token_data = decode::<Claims>(
            &session.token,
            &DecodingKey::from_secret(SECRET.as_ref()),
            &validation,
        )
        .map_err(|_| SessionErr::Decode(SessionDecodeErr))?;
        Ok(token_data.claims.sub)
    }
}
