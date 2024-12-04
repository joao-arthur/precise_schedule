pub struct Session {
    pub token: String,
}

pub struct SessionCreateErr {}

pub struct SessionDecodeErr {}

pub enum SessionErr {
    Create(SessionCreateErr),
    Decode(SessionDecodeErr),
}

pub trait SessionService {
    fn create(user_id: String) -> Result<Session, SessionErr>;
    fn decode(session: Session) -> Result<String, SessionErr>;
}
