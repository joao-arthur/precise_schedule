use std::sync::LazyLock;

use regex::Regex;

#[derive(Debug, PartialEq)]
pub struct InternalDT(pub u32, pub u8, pub u8);

#[derive(Debug, PartialEq)]
pub struct InternalTM(pub u8, pub u8);

#[derive(Debug, PartialEq)]
pub struct InternalISO(pub u32, pub u16, pub u16, pub u8, pub u8);

static DT_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^([0-9]{4})-([0-9]{2})-([0-9]{2})$").unwrap());

static TM_RE: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"^([0-9]{2}):([0-9]{2})$").unwrap());

static ISO_DATE_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})Z$").unwrap()
});

pub fn parse_date(s: &String) -> Result<InternalDT, ()> {
    if let Some(caps) = DT_RE.captures(s) {
        let c: (&str, [&str; 3]) = caps.extract();
        let yyyy = c.1[0].parse::<u32>().map_err(|_| ())?;
        let mm = c.1[1].parse::<u8>().map_err(|_| ())?;
        let dd = c.1[2].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalDT(yyyy, mm, dd));
    } else {
        return Err(());
    }
}

pub fn parse_time(s: &String) -> Result<InternalTM, ()> {
    if let Some(caps) = TM_RE.captures(s) {
        let c: (&str, [&str; 2]) = caps.extract();
        let h = c.1[0].parse::<u8>().map_err(|_| ())?;
        let m = c.1[1].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalTM(h, m));
    } else {
        return Err(());
    }
}

pub fn parse_iso(s: &String) -> Result<InternalISO, ()> {
    if let Some(caps) = ISO_DATE_RE.captures(s) {
        let c: (&str, [&str; 5]) = caps.extract();
        let yyyy = c.1[0].parse::<u32>().map_err(|_| ())?;
        let mm = c.1[1].parse::<u16>().map_err(|_| ())?;
        let dd = c.1[2].parse::<u16>().map_err(|_| ())?;
        let h = c.1[3].parse::<u8>().map_err(|_| ())?;
        let m = c.1[4].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalISO(yyyy, mm, dd, h, m));
    } else {
        return Err(());
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_parse_date() {
        assert_eq!(parse_date(&String::from("2029-12-31")), Ok(InternalDT(2029, 12, 31)));
    }

    #[test]
    fn test_parse_time() {
        assert_eq!(parse_time(&String::from("06:11")), Ok(InternalTM(06, 11)));
    }

    #[test]
    fn test_parse_iso() {
        assert_eq!(parse_iso(&String::from("2029-12-31T06:11Z")), Ok(InternalISO(2029, 12, 31, 06, 11)));
    }
}
