-- Project Name : Haiku
-- Date/Time    : 2023/05/11 23:39:49
-- Author       : yatanb
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  << 注意！！ >>
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
  この機能は A5:SQL Mk-2でのみ有効であることに注意してください。
*/

-- 四季
--* BackupToTempTable
DROP TABLE if exists tbl_season CASCADE;

--* RestoreFromTempTable
CREATE TABLE tbl_season (
  id serial NOT NULL
  , season varchar(10)
) ;

CREATE UNIQUE INDEX tbl_season_PKI
  ON tbl_season(id);

ALTER TABLE tbl_season
  ADD CONSTRAINT tbl_season_PKC PRIMARY KEY (id);

-- ユーザー
--* BackupToTempTable
DROP TABLE if exists tbl_user CASCADE;

--* RestoreFromTempTable
CREATE TABLE tbl_user (
  id serial NOT NULL
  , user_id varchar(100) NOT NULL
  , name varchar(100) NOT NULL
  , created timestamp NOT NULL
  , updated timestamp NOT NULL
) ;

CREATE INDEX tbl_user_IX1
  ON tbl_user(id);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_IX2
  UNIQUE (user_id) ;

ALTER TABLE tbl_user
  ADD CONSTRAINT tbl_user_PKC PRIMARY KEY (id);

-- ハイク
--* BackupToTempTable
DROP TABLE if exists tbl_haiku CASCADE;

--* RestoreFromTempTable
CREATE TABLE tbl_haiku (
  id serial NOT NULL
  , tbl_user_id integer NOT NULL
  , tbl_season_id integer NOT NULL
  , kami_no_ku varchar(10) NOT NULL
  , naka_no_ku varchar(10) NOT NULL
  , shimo_no_ku varchar(10) NOT NULL
  , created timestamp NOT NULL
  , updated timestamp NOT NULL
) ;

CREATE UNIQUE INDEX tbl_haiku_PKI
  ON tbl_haiku(id);

ALTER TABLE tbl_haiku
  ADD CONSTRAINT tbl_haiku_PKC PRIMARY KEY (id);

ALTER TABLE tbl_season
  ADD CONSTRAINT tbl_season_FK1 FOREIGN KEY (id) REFERENCES tbl_haiku(id);

COMMENT ON TABLE tbl_season IS '四季';
COMMENT ON COLUMN tbl_season.id IS 'id';
COMMENT ON COLUMN tbl_season.season IS '四季';

COMMENT ON TABLE tbl_user IS 'ユーザー';
COMMENT ON COLUMN tbl_user.id IS 'id';
COMMENT ON COLUMN tbl_user.user_id IS 'ユーザーID';
COMMENT ON COLUMN tbl_user.name IS '名前';
COMMENT ON COLUMN tbl_user.created IS 'created';
COMMENT ON COLUMN tbl_user.updated IS 'updated';

COMMENT ON TABLE tbl_haiku IS 'ハイク';
COMMENT ON COLUMN tbl_haiku.id IS 'id';
COMMENT ON COLUMN tbl_haiku.tbl_user_id IS 'tbl_user_id';
COMMENT ON COLUMN tbl_haiku.tbl_season_id IS 'tbl_season_id';
COMMENT ON COLUMN tbl_haiku.kami_no_ku IS '上の句';
COMMENT ON COLUMN tbl_haiku.naka_no_ku IS '中の句';
COMMENT ON COLUMN tbl_haiku.shimo_no_ku IS '下の句';
COMMENT ON COLUMN tbl_haiku.created IS 'created';
COMMENT ON COLUMN tbl_haiku.updated IS 'updated';

