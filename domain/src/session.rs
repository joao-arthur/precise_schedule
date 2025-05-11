use super::{generator::DateTimeGenerator, schedule::user::model::User};

#[derive(Debug, PartialEq, Clone)]
pub struct Session {
    pub token: String,
}

#[derive(Debug, PartialEq, Clone)]
pub struct SessionEncodeErr;

#[derive(Debug, PartialEq, Clone)]
pub struct SessionDecodeErr;

#[derive(Debug, PartialEq, Clone)]
pub enum SessionErr {
    Encode(SessionEncodeErr),
    Decode(SessionDecodeErr),
}

pub trait SessionEncodeService {
    fn encode(&self, user: &User, date_time_generator: &dyn DateTimeGenerator) -> Result<Session, SessionErr>;
}

pub trait SessionDecodeService {
    fn decode(&self, session: Session) -> Result<String, SessionErr>;
}

pub mod stub {
    use crate::{generator::DateTimeGenerator, schedule::user::model::User};

    use super::{Session, SessionDecodeErr, SessionDecodeService, SessionEncodeErr, SessionEncodeService, SessionErr};

    pub fn session_stub() -> Session {
        Session { token: "TOKEN".into() }
    }

    pub struct SessionEncodeServiceStub(pub Result<Session, SessionErr>);

    impl SessionEncodeService for SessionEncodeServiceStub {
        fn encode(&self, _user: &User, _date_time_gen: &dyn DateTimeGenerator) -> Result<Session, SessionErr> {
            self.0.clone()
        }
    }

    impl SessionEncodeServiceStub {
        pub fn of_token(token: String) -> Self {
            SessionEncodeServiceStub(Ok(Session { token }))
        }

        pub fn of_err() -> Self {
            SessionEncodeServiceStub(Err(SessionErr::Encode(SessionEncodeErr)))
        }
    }

    pub struct SessionDecodeServiceStub(pub Result<String, SessionErr>);

    impl SessionDecodeService for SessionDecodeServiceStub {
        fn decode(&self, _session: Session) -> Result<String, SessionErr> {
            self.0.clone()
        }
    }

    impl SessionDecodeServiceStub {
        pub fn of_value(value: String) -> Self {
            SessionDecodeServiceStub(Ok(value))
        }

        pub fn of_err() -> Self {
            SessionDecodeServiceStub(Err(SessionErr::Decode(SessionDecodeErr)))
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        generator::stub::DateTimeGeneratorStub,
        schedule::user::model::stub::user_stub,
        session::{Session, stub::session_stub},
    };

    use super::{
        SessionDecodeErr, SessionDecodeService, SessionEncodeErr, SessionEncodeService, SessionErr,
        stub::{SessionDecodeServiceStub, SessionEncodeServiceStub},
    };

    #[test]
    fn session_encode_service_stub() {
        assert_eq!(
            SessionEncodeServiceStub::of_token("TOKEN".into()).encode(&user_stub(), &DateTimeGeneratorStub::of_unix_epoch(1734555761)),
            Ok(Session { token: "TOKEN".into() })
        );
        assert_eq!(
            SessionEncodeServiceStub::of_err().encode(&user_stub(), &DateTimeGeneratorStub::of_unix_epoch(1734555761)),
            Err(SessionErr::Encode(SessionEncodeErr))
        );
    }

    #[test]
    fn session_decode_service_stub() {
        assert_eq!(SessionDecodeServiceStub::of_value("id".into()).decode(session_stub()), Ok("id".into()));
        assert_eq!(SessionDecodeServiceStub::of_err().decode(session_stub()), Err(SessionErr::Decode(SessionDecodeErr)));
    }
}
