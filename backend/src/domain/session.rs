use super::{generator::DateTimeGen, schedule::user::model::User};

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
    fn encode(&self, user: &User, date_time_gen: &dyn DateTimeGen) -> Result<Session, SessionErr>;
    fn decode(&self, session: Session) -> Result<String, SessionErr>;
}

#[cfg(test)]
pub mod stub {
    use super::*;

    pub fn session_stub() -> Session {
        Session { token: String::from("TOKEN") }
    }

    pub struct SessionServiceStub(pub Result<Session, SessionErr>, pub Result<String, SessionErr>);

    impl SessionService for SessionServiceStub {
        fn encode(
            &self,
            user: &User,
            date_time_gen: &dyn DateTimeGen,
        ) -> Result<Session, SessionErr> {
            self.0.clone()
        }

        fn decode(&self, session: Session) -> Result<String, SessionErr> {
            self.1.clone()
        }
    }

    impl Default for SessionServiceStub {
        fn default() -> Self {
            SessionServiceStub(Ok(session_stub()), Ok(String::from("id")))
        }
    }

    impl SessionServiceStub {
        pub fn of_session_err() -> Self {
            SessionServiceStub(
                Err(SessionErr::Encode(SessionEncodeErr)),
                Err(SessionErr::Decode(SessionDecodeErr)),
            )
        }
    }

    mod test {
        use crate::domain::{generator::stub::DateTimeGenStub, schedule::user::stub::user_stub};

        use super::*;

        #[test]
        fn test_session_service_stub() {
            assert_eq!(
                SessionServiceStub::default().encode(
                    &user_stub(),
                    &DateTimeGenStub(String::from("2024-12-18T18:02:41Z"), 1734555761)
                ),
                Ok(session_stub())
            );
            assert_eq!(
                SessionServiceStub::default().decode(session_stub()),
                Ok(String::from("id"))
            );
            assert_eq!(
                SessionServiceStub::of_session_err().encode(
                    &user_stub(),
                    &DateTimeGenStub(String::from("2024-12-18T18:02:41Z"), 1734555761)
                ),
                Err(SessionErr::Encode(SessionEncodeErr))
            );
            assert_eq!(
                SessionServiceStub::of_session_err().decode(session_stub()),
                Err(SessionErr::Decode(SessionDecodeErr))
            );
        }
    }
}
