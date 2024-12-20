use crate::domain::database::DBOp;

use super::model::Event;

pub trait EventRepo {
    fn c(&self, user: &Event) -> DBOp<()>;
    fn u(&self, user: &Event) -> DBOp<()>;
    fn d(&self, id: &String) -> DBOp<()>;
    fn r_by_id(&self, id: &str) -> DBOp<Option<Event>>;
}
