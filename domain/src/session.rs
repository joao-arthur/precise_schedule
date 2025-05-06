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

pub trait SessionService {
    fn encode(&self, user: &User, date_time_generator: &dyn DateTimeGenerator) -> Result<Session, SessionErr>;
    fn decode(&self, session: Session) -> Result<String, SessionErr>;
}

pub mod stub {
    use crate::{generator::DateTimeGenerator, schedule::user::model::User};

    use super::{Session, SessionDecodeErr, SessionEncodeErr, SessionErr, SessionService};

    pub fn session_stub() -> Session {
        Session { token: "TOKEN".into() }
    }

    pub struct SessionServiceStub(pub Result<Session, SessionErr>, pub Result<String, SessionErr>);

    impl SessionService for SessionServiceStub {
        fn encode(&self, _user: &User, _date_time_gen: &dyn DateTimeGenerator) -> Result<Session, SessionErr> {
            self.0.clone()
        }

        fn decode(&self, _session: Session) -> Result<String, SessionErr> {
            self.1.clone()
        }
    }

    impl Default for SessionServiceStub {
        fn default() -> Self {
            SessionServiceStub(Ok(session_stub()), Ok("id".into()))
        }
    }

    impl SessionServiceStub {
        pub fn of_session_err() -> Self {
            SessionServiceStub(Err(SessionErr::Encode(SessionEncodeErr)), Err(SessionErr::Decode(SessionDecodeErr)))
        }
    }

    #[cfg(test)]
    mod test {
        use super::{SessionDecodeErr, SessionEncodeErr, SessionErr, SessionService, SessionServiceStub, session_stub};
        use crate::{generator::stub::DateTimeGeneratorStub, schedule::user::stub::user_stub};

        #[test]
        fn test_session_service_stub() {
            assert_eq!(
                SessionServiceStub::default().encode(&user_stub(), &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761)),
                Ok(session_stub())
            );
            assert_eq!(SessionServiceStub::default().decode(session_stub()), Ok("id".into()));
            assert_eq!(
                SessionServiceStub::of_session_err().encode(&user_stub(), &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761)),
                Err(SessionErr::Encode(SessionEncodeErr))
            );
            assert_eq!(SessionServiceStub::of_session_err().decode(session_stub()), Err(SessionErr::Decode(SessionDecodeErr)));
        }
    }
}
