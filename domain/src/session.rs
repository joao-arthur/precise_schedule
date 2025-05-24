use super::{generator::DateTimeGenerator, schedule::user::model::User};

#[derive(Debug, PartialEq, Clone)]
pub struct EncodedSession {
    pub token: String,
}

#[derive(Debug, PartialEq, Clone)]
pub struct Session {
    pub id: String,
    pub username: String,
}

#[derive(Debug, PartialEq, Clone)]
pub struct SessionEncodeErr;

#[derive(Debug, PartialEq, Clone)]
pub struct SessionDecodeErr;

pub trait SessionEncodeService {
    fn encode<DtTmGen: DateTimeGenerator>(
        &self,
        user: &User,
        date_time_generator: &DtTmGen,
    ) -> Result<EncodedSession, SessionEncodeErr>;
}

pub trait SessionDecodeService {
    fn decode(&self, session: EncodedSession) -> Result<Session, SessionDecodeErr>;
}

pub mod stub {
    use crate::{generator::DateTimeGenerator, schedule::user::model::User};

    use super::{
        EncodedSession, Session, SessionDecodeErr, SessionDecodeService, SessionEncodeErr,
        SessionEncodeService,
    };

    pub fn encoded_session_stub() -> EncodedSession {
        EncodedSession { token: "TOKEN".into() }
    }

    pub struct SessionEncodeServiceStub(pub Result<EncodedSession, SessionEncodeErr>);

    impl SessionEncodeService for SessionEncodeServiceStub {
        fn encode<DtTmGen: DateTimeGenerator>(
            &self,
            _user: &User,
            _date_time_gen: &DtTmGen,
        ) -> Result<EncodedSession, SessionEncodeErr> {
            self.0.clone()
        }
    }

    impl SessionEncodeServiceStub {
        pub fn of_token(token: String) -> Self {
            SessionEncodeServiceStub(Ok(EncodedSession { token }))
        }

        pub fn of_err() -> Self {
            SessionEncodeServiceStub(Err(SessionEncodeErr))
        }
    }

    pub struct SessionDecodeServiceStub(pub Result<Session, SessionDecodeErr>);

    impl SessionDecodeService for SessionDecodeServiceStub {
        fn decode(&self, _session: EncodedSession) -> Result<Session, SessionDecodeErr> {
            self.0.clone()
        }
    }

    impl SessionDecodeServiceStub {
        pub fn of_session(value: Session) -> Self {
            SessionDecodeServiceStub(Ok(value))
        }

        pub fn of_err() -> Self {
            SessionDecodeServiceStub(Err(SessionDecodeErr))
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        generator::stub::DateTimeGeneratorStub,
        schedule::user::model::stub::user_stub,
        session::{EncodedSession, stub::encoded_session_stub},
    };

    use super::{
        Session, SessionDecodeErr, SessionDecodeService, SessionEncodeErr, SessionEncodeService,
        stub::{SessionDecodeServiceStub, SessionEncodeServiceStub},
    };

    #[test]
    fn session_encode_service_stub() {
        assert_eq!(
            SessionEncodeServiceStub::of_token("TOKEN".into())
                .encode(&user_stub(), &DateTimeGeneratorStub::of_unix_epoch(1734555761)),
            Ok(EncodedSession { token: "TOKEN".into() })
        );
        assert_eq!(
            SessionEncodeServiceStub::of_err()
                .encode(&user_stub(), &DateTimeGeneratorStub::of_unix_epoch(1734555761)),
            Err(SessionEncodeErr)
        );
    }

    #[test]
    fn session_decode_service_stub() {
        assert_eq!(
            SessionDecodeServiceStub::of_session(Session {
                id: "id".into(),
                username: "username".into()
            })
            .decode(encoded_session_stub()),
            Ok(Session { id: "id".into(), username: "username".into() })
        );
        assert_eq!(
            SessionDecodeServiceStub::of_err().decode(encoded_session_stub()),
            Err(SessionDecodeErr)
        );
    }
}
