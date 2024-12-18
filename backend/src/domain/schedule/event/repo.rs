use crate::domain::database::DBErr;

use super::model::Event;

pub trait EventRepo {
    fn c(&self, user: &Event) -> Result<(), DBErr>;
    fn u(&self, user: &Event) -> Result<(), DBErr>;
    fn d(&self, id: &String) -> Result<(), DBErr>;
    fn r_by_id(&self, id: &str) -> Result<Option<Event>, DBErr>;
}
