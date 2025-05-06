use crate::database::DBOp;

use super::model::Event;

pub trait EventRepository {
    fn create(&self, event: &Event) -> DBOp<()>;
    fn update(&self, event: &Event) -> DBOp<()>;
    fn delete(&self, id: &str) -> DBOp<()>;
    fn read_by_id(&self, user_id: &str, id: &str) -> DBOp<Option<Event>>;
    fn read_by_user(&self, user_id: &str) -> DBOp<Vec<Event>>;
}
