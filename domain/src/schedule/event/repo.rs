use crate::database::DBOp;

use super::model::Event;

pub trait EventRepo {
    fn c(&self, user: &Event) -> DBOp<()>;
    fn u(&self, user: &Event) -> DBOp<()>;
    fn d(&self, id: &str) -> DBOp<()>;
    fn r_by_id(&self, user_id: &str, id: &str) -> DBOp<Option<Event>>;
    fn r_by_user(&self, user_id: &str) -> DBOp<Vec<Event>>;
}
