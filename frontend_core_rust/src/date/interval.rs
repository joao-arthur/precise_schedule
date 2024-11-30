#[derive(Debug, PartialEq)]
pub struct DayIntv(pub u32);

#[derive(Debug, PartialEq)]
pub struct WeekIntv(pub u32);

#[derive(Debug, PartialEq)]
pub struct MonthIntv(pub u16);

#[derive(Debug, PartialEq)]
pub struct YearIntv(pub u16);

#[derive(Debug, PartialEq)]
pub struct DtIntv {
    pub d: DayIntv,
    pub w: WeekIntv,
    pub m: MonthIntv,
    pub y: YearIntv,
}
