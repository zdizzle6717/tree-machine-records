--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.5
-- Dumped by pg_dump version 9.5.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: AlbumReleases; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "AlbumReleases" (
    id integer NOT NULL,
    caption character varying(255),
    "catalogueNumber" character varying(255),
    "iTunesUrl" character varying(255),
    param character varying(255),
    "releaseDate" date,
    "spotifyUrl" character varying(255),
    summary text,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer
);


ALTER TABLE "AlbumReleases" OWNER TO tmadmin;

--
-- Name: AlbumReleases_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "AlbumReleases_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "AlbumReleases_id_seq" OWNER TO tmadmin;

--
-- Name: AlbumReleases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "AlbumReleases_id_seq" OWNED BY "AlbumReleases".id;


--
-- Name: Artists; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Artists" (
    id integer NOT NULL,
    name character varying(255),
    param character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isCurrent" boolean
);


ALTER TABLE "Artists" OWNER TO tmadmin;

--
-- Name: Artists_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Artists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Artists_id_seq" OWNER TO tmadmin;

--
-- Name: Artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Artists_id_seq" OWNED BY "Artists".id;


--
-- Name: BioSections; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "BioSections" (
    id integer NOT NULL,
    content text[],
    "sourceName" character varying(255),
    "sourceUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer
);


ALTER TABLE "BioSections" OWNER TO tmadmin;

--
-- Name: BioSections_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "BioSections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "BioSections_id_seq" OWNER TO tmadmin;

--
-- Name: BioSections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "BioSections_id_seq" OWNED BY "BioSections".id;


--
-- Name: ContactLists; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "ContactLists" (
    id integer NOT NULL,
    "bandEmail" character varying(255),
    "bandPhone" character varying(255),
    "bandMailingAddress" character varying(255),
    "bookingManagerEmail" character varying(255),
    "bookingManagerPhone" character varying(255),
    "generalManagerEmail" character varying(255),
    "generalManagerPhone" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer
);


ALTER TABLE "ContactLists" OWNER TO tmadmin;

--
-- Name: ContactLists_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "ContactLists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "ContactLists_id_seq" OWNER TO tmadmin;

--
-- Name: ContactLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "ContactLists_id_seq" OWNED BY "ContactLists".id;


--
-- Name: EmbeddableMedia; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "EmbeddableMedia" (
    id integer NOT NULL,
    title character varying(255),
    "linkUrl" character varying(255),
    "embedUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer,
    type character varying(255)
);


ALTER TABLE "EmbeddableMedia" OWNER TO tmadmin;

--
-- Name: EmbeddableMedia_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "EmbeddableMedia_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "EmbeddableMedia_id_seq" OWNER TO tmadmin;

--
-- Name: EmbeddableMedia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "EmbeddableMedia_id_seq" OWNED BY "EmbeddableMedia".id;


--
-- Name: FeaturedAlbumLists; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "FeaturedAlbumLists" (
    id integer NOT NULL,
    "albumReleaseIds" integer[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "FeaturedAlbumLists" OWNER TO tmadmin;

--
-- Name: FeaturedAlbumLists_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "FeaturedAlbumLists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "FeaturedAlbumLists_id_seq" OWNER TO tmadmin;

--
-- Name: FeaturedAlbumLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "FeaturedAlbumLists_id_seq" OWNED BY "FeaturedAlbumLists".id;


--
-- Name: FeaturedSongLists; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "FeaturedSongLists" (
    id integer NOT NULL,
    "songIds" integer[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "FeaturedSongLists" OWNER TO tmadmin;

--
-- Name: FeaturedSongLists_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "FeaturedSongLists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "FeaturedSongLists_id_seq" OWNER TO tmadmin;

--
-- Name: FeaturedSongLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "FeaturedSongLists_id_seq" OWNED BY "FeaturedSongLists".id;


--
-- Name: Files; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Files" (
    id integer NOT NULL,
    name character varying(255),
    size integer,
    type character varying(255),
    identifier character varying(255) DEFAULT 'default'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AlbumReleaseId" integer,
    "ArtistId" integer,
    "MerchItemId" integer,
    "SongId" integer,
    "UserId" integer,
    label character varying(255),
    "imageUrl" character varying(255)
);


ALTER TABLE "Files" OWNER TO tmadmin;

--
-- Name: Files_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Files_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Files_id_seq" OWNER TO tmadmin;

--
-- Name: Files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Files_id_seq" OWNED BY "Files".id;


--
-- Name: MediaMentions; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "MediaMentions" (
    id integer NOT NULL,
    author character varying(255),
    date date,
    "linkUrl" character varying(255),
    title character varying(255),
    text character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AlbumReleaseId" integer,
    "ArtistId" integer
);


ALTER TABLE "MediaMentions" OWNER TO tmadmin;

--
-- Name: MediaMentions_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "MediaMentions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "MediaMentions_id_seq" OWNER TO tmadmin;

--
-- Name: MediaMentions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "MediaMentions_id_seq" OWNED BY "MediaMentions".id;


--
-- Name: MerchItems; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "MerchItems" (
    id integer NOT NULL,
    title character varying(255),
    price character varying(255),
    "shortDescription" character varying(255),
    description character varying(255),
    sku character varying(255),
    qty integer,
    format character varying(255),
    "isDisplayed" boolean,
    "isFeatured" boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AlbumReleaseId" integer,
    "ArtistId" integer
);


ALTER TABLE "MerchItems" OWNER TO tmadmin;

--
-- Name: MerchItems_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "MerchItems_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "MerchItems_id_seq" OWNER TO tmadmin;

--
-- Name: MerchItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "MerchItems_id_seq" OWNED BY "MerchItems".id;


--
-- Name: Origins; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Origins" (
    id integer NOT NULL,
    city character varying(255),
    "stateProvince" character varying(255),
    "stateProvinceCode" character varying(255),
    country character varying(255),
    "countryCode" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer
);


ALTER TABLE "Origins" OWNER TO tmadmin;

--
-- Name: Origins_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Origins_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Origins_id_seq" OWNER TO tmadmin;

--
-- Name: Origins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Origins_id_seq" OWNED BY "Origins".id;


--
-- Name: SocialLinkLists; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "SocialLinkLists" (
    id integer NOT NULL,
    "facebookUrl" character varying(255),
    "twitterUrl" character varying(255),
    "instagramUrl" character varying(255),
    "soundcloudUrl" character varying(255),
    "bandcampUrl" character varying(255),
    "homepageUrl" character varying(255),
    "tumblrUrl" character varying(255),
    "spotifyUrl" character varying(255),
    "youtubeUrl" character varying(255),
    "displayFlag" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer
);


ALTER TABLE "SocialLinkLists" OWNER TO tmadmin;

--
-- Name: SocialLinkLists_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "SocialLinkLists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "SocialLinkLists_id_seq" OWNER TO tmadmin;

--
-- Name: SocialLinkLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "SocialLinkLists_id_seq" OWNED BY "SocialLinkLists".id;


--
-- Name: Songs; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Songs" (
    id integer NOT NULL,
    title character varying(255),
    "fileName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "AlbumReleaseId" integer,
    "ArtistId" integer
);


ALTER TABLE "Songs" OWNER TO tmadmin;

--
-- Name: Songs_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Songs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Songs_id_seq" OWNER TO tmadmin;

--
-- Name: Songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Songs_id_seq" OWNED BY "Songs".id;


--
-- Name: UserMessages; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "UserMessages" (
    id integer NOT NULL,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


ALTER TABLE "UserMessages" OWNER TO tmadmin;

--
-- Name: UserMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "UserMessages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "UserMessages_id_seq" OWNER TO tmadmin;

--
-- Name: UserMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "UserMessages_id_seq" OWNED BY "UserMessages".id;


--
-- Name: UserNotifications; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "UserNotifications" (
    id integer NOT NULL,
    type character varying(255),
    status character varying(255) DEFAULT 'unRead'::character varying,
    "fromId" integer,
    "fromName" character varying(255),
    "fromUsername" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


ALTER TABLE "UserNotifications" OWNER TO tmadmin;

--
-- Name: UserNotifications_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "UserNotifications_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "UserNotifications_id_seq" OWNER TO tmadmin;

--
-- Name: UserNotifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "UserNotifications_id_seq" OWNED BY "UserNotifications".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    email character varying(255),
    username character varying(255),
    dob date,
    password character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    bio text,
    "homepageLink" character varying(255),
    "facebookLink" character varying(255),
    "twitterLink" character varying(255),
    "instagramLink" character varying(255),
    "soundcloudLink" character varying(255),
    "siteAdmin" boolean DEFAULT false,
    artist boolean DEFAULT false,
    subscriber boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ArtistId" integer,
    "UserId" integer
);


ALTER TABLE "Users" OWNER TO tmadmin;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: tmadmin
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO tmadmin;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tmadmin
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: userHasFriends; Type: TABLE; Schema: public; Owner: tmadmin
--

CREATE TABLE "userHasFriends" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "FriendId" integer NOT NULL
);


ALTER TABLE "userHasFriends" OWNER TO tmadmin;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AlbumReleases" ALTER COLUMN id SET DEFAULT nextval('"AlbumReleases_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Artists" ALTER COLUMN id SET DEFAULT nextval('"Artists_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "BioSections" ALTER COLUMN id SET DEFAULT nextval('"BioSections_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "ContactLists" ALTER COLUMN id SET DEFAULT nextval('"ContactLists_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "EmbeddableMedia" ALTER COLUMN id SET DEFAULT nextval('"EmbeddableMedia_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "FeaturedAlbumLists" ALTER COLUMN id SET DEFAULT nextval('"FeaturedAlbumLists_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "FeaturedSongLists" ALTER COLUMN id SET DEFAULT nextval('"FeaturedSongLists_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files" ALTER COLUMN id SET DEFAULT nextval('"Files_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MediaMentions" ALTER COLUMN id SET DEFAULT nextval('"MediaMentions_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MerchItems" ALTER COLUMN id SET DEFAULT nextval('"MerchItems_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Origins" ALTER COLUMN id SET DEFAULT nextval('"Origins_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "SocialLinkLists" ALTER COLUMN id SET DEFAULT nextval('"SocialLinkLists_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Songs" ALTER COLUMN id SET DEFAULT nextval('"Songs_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserMessages" ALTER COLUMN id SET DEFAULT nextval('"UserMessages_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserNotifications" ALTER COLUMN id SET DEFAULT nextval('"UserNotifications_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: AlbumReleases; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "AlbumReleases" (id, caption, "catalogueNumber", "iTunesUrl", param, "releaseDate", "spotifyUrl", summary, title, "createdAt", "updatedAt", "ArtistId") FROM stdin;
2		TMR0010	https://itunes.apple.com/us/album/everything-is-happening/id943376868	everything-is-happening	2012-09-29	https://open.spotify.com/album/3zEn1AEGtMusYJbWwRLU5U		Everything Is Happening	2016-12-18 17:00:42.093+00	2016-12-18 17:00:42.093+00	9
3		TMR0012	https://itunes.apple.com/us/album/tweaker-two/id1088686849	tweaker-ii	2013-03-25	https://open.spotify.com/album/6lC4XQmuYiCh0tGqVPayiR	Replacing much of the acoustic guitar from the first release with electric, Tweaker Two still feels sparse, although the sound is heavier this time around. Opening song “If/Then” is a slow-burner, building from a spare electric guitar hook and vocals that exude bitter wit through cause and effect wordplay. “Freak Me Out” sounds like Nirvana if they had grown up listening to The Zombies instead of Black Flag. The album’s closer, “They Missed It,” combines intricate guitar work, cryptic lyrics, steadily building backbeats and underlying pop melodies. Tweaker Two is certainly more somber than its predecessor, however, it also showcases an artist who has learned to mature while honing his song-writing skills.	Tweaker II	2016-12-18 17:14:46.648+00	2016-12-18 17:14:46.648+00	17
4		TMR0013		stranger-things	2013-05-01			Stranger Things	2016-12-18 17:15:05.237+00	2016-12-18 17:15:05.237+00	13
5		TMR0014	https://itunes.apple.com/us/album/blimp-rock/id1039485040	blimp-rock	2013-05-28	https://open.spotify.com/album/0gbAvpdoaRL13KMbwvXzle		Blimp Rock	2016-12-18 17:15:25.411+00	2016-12-18 17:15:25.411+00	3
6		TMR0015	https://itunes.apple.com/us/album/loves-you/id1124659730	loves-you	2013-06-27	https://open.spotify.com/album/36cRMvfHfH7o0tnEwBJTRL		Loves You	2016-12-18 17:15:43.935+00	2016-12-18 17:15:43.935+00	14
7		TMR0016	https://itunes.apple.com/us/album/dance-floor-secrets/id674855321	dance-floor-secrets	2013-06-30	https://open.spotify.com/album/4IVv3pp4PQrcFG1gu4H3Pr	'This album is the heartbeat to my life, as it will give you a sense of closeness to me. Being able to understand who I am through this album is easy. If you listen closely you will be able to identify me as a person and not just a name. This is my first album ever so I put all that I have into it. I called it ‘Dance Floor Secrets’ because of the inspiration I got from my grandma who passed 5 years back as she could dance to any song I was playing. It didn’t matter whether it was hip-hop, house, electro, she danced to every song. Getting that from her I was able to create this album which has different sounds and different genres put in one album with a bit of my taste too. Every person should be able to identify his taste or favorite song somewhere in this album, and there should be something for everyone here.' - EAZY	Dance Floor Secrets	2016-12-18 17:15:59.753+00	2016-12-18 17:15:59.753+00	4
8		TMR0019		vows	2014-03-27		“Dream Pop seems to be all the rage at the moment, and ‘Vows’ from the US are a good example of it. Blending psychedelia with easy listening but schizophrenic pop melodies, their latest self-titled EP takes you on a journey into someone else’s insanely imaginative head, throws you around a bit inside, and then spits you out the other end, making you wonder what exactly it is you just listened to. And I like that.” – Sonically Selective	Vows	2016-12-18 17:16:22.191+00	2016-12-18 17:16:22.191+00	13
9		TMR0021		0	2014-03-27			0	2016-12-18 17:16:40.215+00	2016-12-18 17:16:40.215+00	13
10		TMR0022		black-blood-stains	2014-04-26		“It’s an eerie, electro number with funkadelic Discovery era Daft Punk-esque tinge to it. It starts you off with a smooth muted bass before the claps get you into the rhythm and the electro-xylophonic melody keeps your body moving. By the time the strings break it down you’re lost in a synthesised paradise that suspends you on your high only to get you back into the groove all over again.” -Feedback Musiq	Black Blood Stains	2016-12-18 17:16:54.207+00	2016-12-18 17:16:54.207+00	4
11		TMR0023	https://itunes.apple.com/us/album/call-you-on-it/id888315522	call-you-on-it	2014-06-25	https://open.spotify.com/album/7fh9HfCtTrozppkKMwBIBk	'An album that dabbles a bit in trip-hop, new age and deep house , that is what Jon Dice offers music lovers on ‘Call You On It’. Jon Dice is the project of Jeff Pupa started in 2008 after returning to the East Coast from Alaska. The project is an ever-changing endeavor through sectors of EDM. Jeff is also the vocalist and guitarist for dream-noir band, Vows. All of his work has been produced in an 'archaic' home studio which consists of a macbook, a Tascam Portastudio III, a 4-in-1 record player, and a Shure 58 microphone. Jon’s first project, an EP entitled ‘Climaxxx’ was released back in 2008. It was a confused and 'dirty dark acid' house sound, a quiet home-recorded release. His first full length album, ‘Soak’, was released in 2009 which was more of a funk dance project. His music continues to evolve over time, as he tries new sounds and samples from different genres to create a style that’s all his. To get an idea of his style, Jon is influenced by several artists including, Burial, Boards of Canada, Madlib, Flying Lotus and Aphex Twin.' - First Ear	Call You On It	2016-12-18 17:17:09.637+00	2016-12-18 17:17:09.637+00	5
12		TMR0026	https://itunes.apple.com/us/album/hero/id955232235	hero	2014-10-31	https://open.spotify.com/album/4F64GYLbjofiy5XSQ68c7q	Hero EP includes previously unreleased tracks re-imagined and produced specifically for release on limited edition TRANSLUCENT PURPLE tape cassette! This is a split release with New Jersey based dream-rockers VOWS (vowsmusic.com). Limited to 100 hand-numbered cassettes. The pre-order will open next week on Wednesday, October 15th.	Hero	2016-12-18 17:17:47.173+00	2016-12-18 17:17:47.173+00	9
13		TMR0028	https://itunes.apple.com/ca/album/sophomore-slump/id981973796	sophomore-slump	2015-04-07	https://open.spotify.com/album/3s5l15EhYSSeS6XmDtMDpX	'First market tested in 2013 with the release of self-titled album Blimp Rock, Blimp Rock’s comedic indie rock was a surprise success for Blimp Rock Enterprises, easily outpacing their previously top-performing investment in Rolodex futures. The band’s whimsical everyday subject matter and Demakos’ laconic delivery struck a cord with audiences worldwide, and the tour dates followed. Over a star-studded ensuing year the band has toured the world, presenting the Blimp Rock message through music and PowerPoint in all the world’s finest cities: Paris, Peterborough, Berlin and Guelph. Sophomore Slump, the second Blimp Rock album, is being released to the public on April 7th, 2015. Investors have already begun clamoring for Blimp Rock Enterprises to take its stock public in anticipation of the release, which Demakos has promised will be “a real disappointment” compared to their first album. Featuring tributes to boys who cry during movies, conflict resolution over stolen pizza, and the anthemic single ‘Let’s All Stay in Tonight’, Blimp Rock captures the odds and emotional ends of real life on the ground... for now.' - CBC	Sophomore Slump	2016-12-18 17:18:07.84+00	2016-12-18 17:18:07.84+00	3
14		TMR0029	https://itunes.apple.com/us/album/a-better-way/id955227431	a-better-way	2015-01-01	https://open.spotify.com/album/4sN7qZnLHZG1mXqVKmZZ9k	'The album begins with a minute of chunky synth tones which build into the straightforwardly warped electro-jam that is “Dead Horse.” Barely-audible spoken-word samples worm their way over the intersecting digitized melodies (think less playful Todd Terje with words added into the mix), creating a sort of whirlwind of artificial sound that’s as colorful as it is driving. “Ticks” begins with very slight tonal clicks (or ticks, one might say) over a stomp-clap beat and slippery synth pads; quickly, the idyllic calm is broken by a wobbly and harsh bass tone reminiscent of EDM (but not executed in a style typical of dance music). Drippy synth licks slide upwards in the gaps left between bass beats, and the almost-inaudible words return to befuddle us yet again (something about “hard labor” and “flows through your blood”). The groove lasts for a while until the synth pads suddenly fade out to let a vocal sample shine through – “I’ll fucking blind you” is perfectly comprehensible, and the mix gets violent yet again. “CEO” (as previously premiered on No Smoking) is essentially a noir film soundtrack, a sharp left turn away from the chunky/artificial/glitchy sounds of the first two tracks. The violin melody is created artificially, sure, and a robot voice breaks up instrumental sections, but there’s still the curated sensation of being transported to a time where the synthesizer didn’t quite exist. The self-titled track brings us back to the altered EDM feels with synthesized tones that streak by in hard left/right pans, and we’re finally treated to a comprehensible vocal sample that sings melody over a pleasant groove ('you will find a better way – entertain').' - No Smoking Media	A Better Way	2016-12-18 17:18:20.661+00	2016-12-18 17:18:20.661+00	5
15		TMR0030	https://itunes.apple.com/us/album/soak/id957826609	soak	2015-01-21	https://open.spotify.com/album/6ZNwU7c3nPWB1cNBXn4Lke		Soak	2016-12-18 17:18:34.869+00	2016-12-18 17:18:34.869+00	5
16		TMR0031	https://itunes.apple.com/us/album/jon-dice-presents-dubcake/id957891471	jon-dice-presents-dubcake-volume-1	2015-01-21	https://open.spotify.com/album/7kW5xonKwrMJzccCO6OvOL		Jon Dice Presents Dubcake: Volume 1	2016-12-18 17:18:46.478+00	2016-12-18 17:18:46.478+00	5
17		TMR0033	https://itunes.apple.com/us/album/wonderbitch-ep/id1020792733	wonderbitch	2015-07-21	https://open.spotify.com/album/36cRMvfHfH7o0tnEwBJTRL	'On June 19th, Austin’s favorite disco/psychedelic/progressive rock band, Wonderbitch, released their new self-titled EP. People gathered for a night of musical celebration at Swan Dive but were not quite prepared for the face melting that would ensue. Ohhh yes. That is right. This extended play is packed with groovy dance tunes that will have you moving. WB is made up of four members — Alex Chod on keyboard and vocals, Butch Wade on the drums, Colton Hardin on the guitar, and Corey Fitzgerald Spears on the bass. This album was recorded at a home studio with the assistance of Jet Jaguar of IDLE Productions and Mark Schroth of The Recording Conservatory of Austin. It features Adam Littman’s sexy saxophone on track 4 and was mastered by Jerry Tubb of Terra Nova Digital Audio, Inc. Now, on to the review! The album opens up with a high-energy combination of upbeat synth sounds and fast paced high hat action on the drums. The retro sounds resemble ones that you may have heard on a video game featuring an anthromorphic blue hedgehog that runs around collecting golden rings. (Did you catch that reference?) The first track titled “Beingness” is a canticle of grooviness that pulls you out of your head and on onto the dancefloor. It is an invitation of full presence' - Medium	Wonderbitch	2016-12-18 17:19:06.88+00	2016-12-18 17:19:06.88+00	14
18		TMR0034	https://itunes.apple.com/us/album/woof./id960117636	woof	2015-02-10	https://open.spotify.com/album/1n8pR3PdEFsE9loQaQYKEF	'Born of the New Jersey music scene, WOOF is the latest project to grasp electronica inspired indie-pop by the metaphorical balls and swing it towards the ceiling of otherworldly goodness. Signed to Tree Machine Records, the project belongs to multi-instrumentalist Kelan Bonislawksi, who after years of artistic rambling found he could play enough instruments to effect the sound of a full band. The rest, as they say, is history. Recently in receipt of a debut, self-titled EP, WOOF is now on a mission to reignite his chosen genre. Think Beck taking a turn at the subterranean pop scene, or Pillar Point acting a little more mainstream; this is exactly the kind of music in with a chance of making it onto Radio One’s A-list, simply for being cool. No radio play budget required when the quality of musicianship is this good.'	WOOF.	2016-12-18 17:19:18.985+00	2016-12-18 17:19:18.985+00	15
19	There and Back, a Journey to the Island of Time	TMR0035	https://itunes.apple.com/us/album/living-hour/id1081169143	living-hour	2015-04-23	https://open.spotify.com/album/6m9lzIbWvUtGFn1CUj2FUh	'Guitar-centric bands obsessed with reverb are a dime a dozen. Sure, there are variations to the sound that still surprise, but they’re getting harder and harder to find. While Living Hour’s self-titled may not necessarily be a monumental leap forward for this style of music, its charm is found in dialing back to the past for inspiration, rather than trying to invent the newest, most futuristic sound. Instead of trying to hop on the super-hip train along with bands such as DIIV or Beach Fossils, Living Hour’s music reaches way further back than the late ‘70s for inspiration. It has a quality much more akin to the lazy, balladic guitar moments of the late ‘50s and early ‘60s. The music here possesses a hazy quality more partial to old school guitar standards such as Santo and Johnny’s “Sleep Walk” than anything of the more post-punk or shoegaze stripe. Right from the get-go, with “Summer Song,” minimalism is the order of the day, and it’s a decision that pays off. Best Coast might have dibs on the surf-rock-on-Xanax sound these days, but it’s refreshing to hear another band pull it off with such gusto.' - Paste Magazine	Living Hour	2016-12-18 17:19:33.062+00	2016-12-18 17:19:33.062+00	8
20		TMR0036		music-for-good-ears	2015-05-25		The 2nd release from South African beatmaker, EAZY, Music for Good Ears is something expected in it’s style but unexpected in its maturity. Eazy shows versatility as a DJ that can also write original tracks that get the whole world moving. As a musician influenced by artists far from home, he knows how to reach the furthest part of our psyche and remind us who we really are.	Music for Good Ears	2016-12-18 17:19:43.83+00	2016-12-18 17:19:43.83+00	4
21	Mysticism and Magic	TMR0037		dead-mystics	2015-10-20		'Trust me, listening to Dead Mystics by !mindparade is definitely something you want to do with a decent pair of ear goggles. With such a dense, lush soundscape, there’s so much ambient nectar for the brain to process it really should be consumed as closely to the ol’ grey matter as possible. Not to say this doesn’t sound amazing through a pair of 2x15” cabs with 18” subs, just that it’s worth absorbing first with closed-back headphones. Listen to the album this way, and you can tweet me your thanks later. From the opening riff of 'See You,' I spent the first listen of this song trying to figure out what influence was predominant in each track. Maybe it’s just me, but on listening to this collection of songs, it seems that Alex and the friends that make up !mindparade have enviable music collections.' - Musical Family Tree	Dead Mystics	2016-12-18 17:22:16.875+00	2016-12-18 17:22:16.875+00	9
22	The Heart of Korea	TMR0038		i-don't-want-to-open-the-window-to-the-outside-world	2015-08-07		Pony formed in 2009 and released their official debut album the same year. They began as a post punk band and quickly gained notoriety from various Korean media outlets and fashion magazines. Tiring of the rock scene and their image’s association with fashion, the band moved towards a more shoegazing, noise pop sound; releasing their ep, Little Apartment, in 2012. During this time they were featured by Fred Perry Subculture and released two music videos with the brand. Soon after they decided to stop all activities and took a three-year hiatus. They soon returned with their 2nd album, signing with TM Records.	I Don't Want to Open the Window to the Outside World	2016-12-18 17:22:33.511+00	2016-12-18 17:22:33.511+00	10
23	The Modern One Man Band	TMR0039		bad-connection	2015-10-20		'WOOF is the solo project of multi-instrumentalist and singer Kelan Bonislawski, based in New Jersey. His latest album Bad Connections was released on Indiana-based record label Tree Machine Records on October 20th. 'Faultline' is WOOF’s second single from the album, accompanied by a colorful interactive gif. Click this link to play with it and stream the track. In case you’re on mobile, the link leads you to a giant looping gif with some colored balls that blob around when you move your mouse. WOOF’s music is as colorful as the accompanying gifs – jangly guitars, lackadaisical vocals, drums absolutely drenched in reverb. It’s a pretty fun bit of HTML, and an interesting way to supplement (subvert?) the music video. If WOOF’s music was a dog, it’d probably materialize into something like the above photo: friendly, loyal, chill as fuck but still kind of sassy. His music paws the line (these puns are killing me) between digital and analog. Though 'Faultline' is more guitar based, many of the tracks on Bad Connection use MIDI and samples. The music sounds sonically comfy, but it’s clear that there is a huge amount of work put in, since Bonislawski himself arranges and plays all the instruments – kind of like a deconstructed band.' - No Smoking Media	Bad Connection	2016-12-18 17:22:53.887+00	2016-12-18 17:22:53.887+00	15
28	A Conversation About Sex	TMR0045	https://itunes.apple.com/au/artist/bartholin/id1149004885	bartholin	2016-09-29	https://play.spotify.com/album/4fVqhTLVyLDPztKqizbZYq?play=true&utm_source=open.spotify.com&utm_medium=open	Bartholin is a conversation between friends about sex.  Debuting their first album and collaboration with Tree Machine Records, the duo Drew Danburry and Cat Leavy take turns singing over carefully, compelling tunes on this self-titled EP.  Delving into the deep crevasse of the inner psyche and stirring the pot of what makes us tick as human animals, 'Bartholin' is an exploration into the Freudian subconscious and the end result is eargasmic.  The melody is soothing and pleasantly taxing throughout, snagging various heartstrings and melting into a sort of cryptic symbiosis.	Bartholin	2016-12-18 17:27:48.312+00	2016-12-18 17:27:48.312+00	2
26	A Deeper Dive Into The Human Soul	TMR0043	https://itunes.apple.com/us/album/treated/id1138358060	treated	2016-09-01	https://play.spotify.com/album/2OnK1LrKcJGDkoyhMjePDB?play=true&utm_source=open.spotify.com&utm_medium=open	Austin Bey's debut album, Treated, is an 8 track EP that reveals a hard earned melancholy and an unwavering desire to express true pain.  The album was written in the hospital while recovering from being hit by a car, and it was recorded shortly after returning home.  His previous work was more focused on the role of producing other artists, and this time he wanted to create something that was his own vision. Born in an area of Baltimore where rap reigned supreme over all other genres of music, Austin found himself the oddball in his neighborhood and school for deciding to branch off into other musical realms. Having produced rap music for years, Austin was bored and unhappy with the music he’s made; wanting something more out of the talents he had acquired over time.  Some of the tracks aren't rap at all, but more of a soulful storytelling.  This is Austin Bey.	Treated	2016-12-18 17:26:16.73+00	2016-12-31 23:12:57.027+00	1
27	A Drifting, Cathartic Miracle	TMR0044		body-is-working	2016-12-02	https://play.spotify.com/artist/7Di4GL49iHNrKwVjKz0UGq?play=true&utm_source=open.spotify.com&utm_medium=open	'I feel like the best examples of songwriting seem to encapsulate a fleeting moment in time, having sprung immediately out of nowhere, directly from our subconscious. Leonard Cohen famously said, 'if I knew where the good songs came from, I'd go there more often.' With 'I Recollect,' I completely dreamed about 75% of it. In the dream, I was going through piles of storage with an old housemate I used to be in a band with, and found a CD-R, which in the dream I believed to contain some of our old demos. I put the CD on and 'Slowburner' and 'I Recollect' came out of the stereo. In the dream the song had a female vocalist, even though the old band in reference was largely instrumental. Katie and I had been working on other material around the time before the Sonic Cauldron gig, so it seemed perfect to have her sing it.'	Body Is Working	2016-12-18 17:27:35.33+00	2016-12-28 00:36:08.674+00	7
29	You Have the Right to Remain Silent	TMR0046		undercurrent	2016-11-11		What’s so instantly striking about the music of Ladycop is the sheer quality of the three-part vocal harmonies; they brings to mind acts like The Wharves of Warpaint, but somehow have a beguiling quality all of their own. Coupled with the music; a whirl of pulsing bass and swathes of guitar, strings and whatever else the band can lay their hands on, their sound is part experimental psych-folk, part perfect, hazy dream-pop. 'Undercurrent came to be when I was screwing around with my loop pedal in January 2015. I tapped down a psychy drum beat as a foundation, and started adding “vocal instrumental” layers on top. I write sections by blending piano/bass line compositions and vocal expressions. I’ll transpose a vocal line onto a musical instrument, or use vocal lines themselves as a type of orchestration.'	Undercurrent	2016-12-18 17:28:09.624+00	2016-12-18 17:28:09.624+00	6
30	Piercing The Soul, Psychic Trance	TMR0040	https://itunes.apple.com/us/album/4x3-ep/id1081102013	4x3	2016-04-03	https://play.spotify.com/album/7djAjCL2JZuFOYlDJefVjK?play=true&utm_source=open.spotify.com&utm_medium=open	The Psychics are a psychedelic music collective founded in 2010 by Jerome X. Spanning 5 years and numerous genres, The Psychics have explored numerous tropes of psychedelic music from the past 50 years and across the world with an innovative and explosively emotional live show. They are known for featuring numerous collaborators to extend their hypnotically psychedelic and equally pop sound into even further dimensions. They can currently be found playing shows in Nashville, TN where the rock n’roll is loud, fast, and in your face.	4x3	2016-12-18 18:27:27.63+00	2016-12-18 18:27:27.63+00	11
32	The French Wonder, A Man, An Artist	TMR0041	https://itunes.apple.com/album/wipeout!-ep/id1114729286	wipeout	2016-05-27	https://open.spotify.com/album/2jB08ysYLZkjZdkz90k3FA	Shorebilly is the project of self-taught multi-instrumentalist and producer Rémi Alexandre playing guitar, bass and keyboard alongside various artists and bands such as Syd Matters, H-Burns, Mellow, etc. When speaking of artists that influenced him, Rémi mentions François de Roubaix's elegance, melodic evidence and taste for sound experiments, and Dennis Wilson, dark accursed surfer and outsider Beach Boy. He admires multi-instrumentalist Todd Rundgren for his work as a producer and his soulful writing. He also mentions his friends and spiritual fathers, the members of french touch band Mellow, who passed on to him a true passion for production. And eventually Syd matters band leader Jonathan Morali with whom he shared ten intense years on the road. His debut 6 track record 'WipeOut!' is a colorful collection of songs that lead Rémi to confront himself musically, and apply his production skills to a personal project. The production is condensed, precise, focused on groove and melody, with an ambition to move listeners, as well as make them move. Behind his intricate writing lies pure stylistic freedom, and a will to brake all aesthetic and conceptual barriers. This ep was written and recorded as spontaneously as possible to avoid getting lost in long and complicated thought process. Shorebilly composes a singular and sincere music fit for all sensibilities, a hectic yet organic soundscape where pop and electronic music collide. Rémi Alexandre constantly pumps life and emotion into a synthetic universe of his own creation. This passionate and thin-skinned workaholic has decided to surf his own wave and 'Wipeout!' is his declaration of love for music.	Wipeout!	2016-12-18 18:31:44.716+00	2016-12-18 18:31:44.716+00	12
33	A Dreamscape of Aural Contagium	TMR0042	https://itunes.apple.com/us/album/vhs-dreams-ep/id1128143025	vhs-dreams	2016-07-16	https://play.spotify.com/album/0ACDBJnPfN4NQtd5QTnXG9	You Are Number Six is a musician whose songs carry infinite joy.  'VHS Dreams' is a dreamscape of electronics with Summer vibes and good times.  The album cover speaks for itself, and we're reminded of the more electronic side of New Order mixed with the vocal style of a French Robert Smith on sunny days and cool July nights.  Lush 80's synth takes you back in time and returns a feeling of easy living, lemonade, and poolside weather. Get acquainted with the kookie electronics and synth rhythms, and break away from the monotony of routine. Don't be just another number in the system. Dream of the days before data mining and machine learning when a VHS was the most advanced mass media.	VHS Dreams	2016-12-18 18:39:45.042+00	2016-12-18 18:39:45.042+00	16
35	Tweak on tweakin' on	TMR0001	https://itunes.apple.com/us/album/tweaker-in-the-park/id444635532	tweaker-in-the-park	2011-06-07	https://play.spotify.com/album/48ZP4H2uywug0LJgzr6QFO?play=true&utm_source=open.spotify.com&utm_medium=open	HiaHC worked with Tree Machine Records to put together this album during their first semester at Indiana University. It is a collection of songs with an underlying theme which reflects his keen apt for psychology. It was released on December 25, 2010 on Christmas Day under TM Records for free download. Soon after it was picked up by Gulcher Records who offered a distribution deal. Re-release by Gulcher was June 7, 2011 and a digital release followed shortly after.	Tweaker in the Park	2016-12-18 18:51:32.329+00	2016-12-18 18:51:32.329+00	17
36	The Good Old Days	TMR0002		making-the-most	2011-07-16		I was cornered and trapped by a raging bull after a full day of fishing with my buddy, Owen Yonce, front man for the Majestic Springs Band. Not a typical day for me, but common practice for our good friend Bonfire John,” … “This wasn’t just a big cow either, this was a thousand pound beast circling us at high speeds and taunting us with flaring nostrils and stomping feet as we were pushed back to the edge of a dock on a mucky lake at the farm. Luckily we dodged that bullet and stayed dry, and the next day Yonce was off on a trek across the country to rock climb, hike, roam canyons, and make familiar the rural landscapes that can sometimes be overshadowed in this modern America. He’s truly a man who knows how to ‘make the most,’ the title of his first LP release with the band.	Making the Most	2016-12-28 01:02:33.347+00	2016-12-28 01:02:33.347+00	18
37	Diving Deeper Into The Subconscious	TMR0003		why-so-routine	2011-08-07			Why So Routine?	2016-12-28 01:16:47.873+00	2016-12-28 01:16:47.873+00	19
38		TMR0004		one-hungry-acre	2012-03-26			One Hungry Acre	2016-12-28 01:17:55.011+00	2016-12-28 01:17:55.011+00	20
39		TMR0007		early-life	2011-07-15			Early Life	2016-12-28 01:19:37.691+00	2016-12-28 01:19:37.691+00	19
40		TMR0008		before-i-was-a-ghost	2012-08-01			Before I Was a Ghost	2016-12-28 01:21:52.449+00	2016-12-28 01:21:52.449+00	21
41		TMR0009	https://itunes.apple.com/us/album/gather-round-ep/id549513338	gather-round	2011-08-06	https://open.spotify.com/album/3Jy2zcwFBJHfQlx1XV66Cy	Bonfire John released his first EP. It’s a 5 track album that refines the artists nonchalant characteristics with clever vocal melodies and a relaxed atmosphere of sound. Recorded in Bonfire John’s home, the tracks carry a deeper emotion of his every day life and a certain carefree routine.	Gather Round	2016-12-28 01:22:46.189+00	2016-12-28 01:22:46.189+00	18
42		TMR0011		intricate-circuits	2013-01-15			Intricate Circuits	2016-12-28 01:23:56.593+00	2016-12-28 01:23:56.593+00	27
43		TMR0017	https://itunes.apple.com/us/artist/the-stomping-academy/id382611376	happy-family	2013-09-25	https://open.spotify.com/album/2PSr5ikLY0ybc97nxG7Wk3		Happy Family	2016-12-28 01:29:47.778+00	2016-12-28 01:29:47.778+00	28
44		TMR0018		only-the-beginning	2014-01-08		The album encompasses an artistic experience for both myself and the people around me. Rather than writing songs about ideas, I focused on composing during the development of ideas. From the 21 years of life that I have not only enjoyed, but also in many instances endured, I found, as I believe most do, that many of my life perspectives had untied ends. We all search for answers, and especially certainty in life. Each song stems from an idea or perspective that I felt as a 20 year old in 2012, needed further examining or expanding. The album took up the past 2 years of my life as I spent segments of time dedicated to each track and the ideals it carried. As the ideals formed new and more complete meaning, so too did the songs. Many of the tracks encompass a change from start to finish, and many of them simply hold the perspective and depth of the ideal itself. The album as a whole was written in order from beginning to end. My conclusion…The only bad people in the world are those who try to control someone other than themselves. And if you can’t control yourself, you won’t find peace. Everyone is conscious and aware of the same things you are. Down with Machines.	Only The Beginning	2016-12-28 01:31:18.271+00	2016-12-28 01:31:18.271+00	19
45		TMR0020		dive	2014-03-25			Dive	2016-12-28 01:31:56.851+00	2016-12-28 01:31:56.851+00	23
46		TMR0024	https://itunes.apple.com/us/album/artifacts-ep/id944962669	artifacts	2014-12-10	https://open.spotify.com/album/5P008MHyyVhYSxsU1Z046N	If I want to die famous, I’ll need to capsulize my art. I’ll need to package it for you the consumer, or worse yet, the critic. But I don’t have any real name. I don’t have any real face. I don’t have any real motive save the last expression before I check out. There is little lasting for saved existence and to be immortalize through music is to believe in a false immortalization. Instead, embalm me. And leave my tracks, this music, written in 2010 and held guarded until 2014 alone to the birds. If you can conceptualize, than conceptualize now. Conceptualize this. Here I begin a biography. I was born onto this rock. I was raised on this rock. And I will die on this rock. Like you. Like every other human being who ever suffered to inhale the stale air of the system, I am nothing. Now, my system, is without flaws. It is in its perfection and with this I say goodbye. There is no more new music coming. There never was any hype.	Artifacts	2016-12-28 01:32:49.222+00	2016-12-28 01:32:49.222+00	24
47		TMR0025	https://itunes.apple.com/us/album/college/id944246367	college	2014-10-21	https://open.spotify.com/album/6j45D8hycIfN1S4RPBmnPR	Since our freshman decision that forming a record label might be a cool idea in 2010, the four years of college that followed were a learning experience that none of us could have predicted. The idea first emerged from lo-fi recording sessions with the anonymous artist who is Hypocrite in a Hippy Crypt as well as recording with Owen Yonce, multi-instrumentalist who started Bonfire John (and the Majestic Springs Band). As time went on and more music got recorded, it was a slow few years through sophomore and junior year in terms of developing any business sense whatsoever. Most of our efforts at that time went toward music, house shows, and partying. We collaborated with new artists though, some on opposite sides of the world, and eventually we built a steady roster. Early Junior year, we experimented with the surprisingly intricate process of connecting with the right people to press a vinyl. We awoke from drug ridden days and alcohol ridden nights late into our Junior year to find that we had nothing left to offer but our own recovery and the harsh realities of lessons learned. The release of Tweaker II, predecessor of Tweaker In The Park, was rough and the heart just wasn’t there, but we shared with the world our first record.…now only a few months after graduation, and just as 4 more years begin for the next lucky suitors to carry the torch of college life, we are planning our second vinyl titled, College. The tracks were recorded over the span of about 4 years that we were in school and throughout central Indiana, and we’re excited to have something that we feel is honest, intrinsic, dynamic, and jam packed with integrity.	College	2016-12-28 01:33:59.973+00	2016-12-28 01:33:59.973+00	18
48		TMR0027	https://itunes.apple.com/us/album/turn-it-up/id971557096	turn-it-up	2015-02-24	https://open.spotify.com/album/6HVqnv7S791Zf83A0ABZnN	One of the Philadelphia area’s best kept secrets, The Danger O’s have been a consistent and prolific power pop machine for the past eight years. They have released something every year since 2008. Currently, The Danger O’s are readying the release of their third full length, Turn It Up. Look for an early 2015 release and plenty of shows throughout the rest of the year.	Turn It Up	2016-12-28 01:35:15.629+00	2016-12-28 01:35:15.629+00	25
49		TMR0032	https://itunes.apple.com/us/album/yetunde-ep/id961760996	yetunde	2015-01-27	https://open.spotify.com/album/4kqUJU9QsS8yIWW6zewTj4	'Fuji Kureta is an electronic pop duo from Istanbul. The group is comprised of Sahin Kureta (music-programming) and Deniz Ozturk (lyrics-vocals) which have been making music together since late 2008. Fuji Kureta recently released their new 4 track EP, Yetunde, on South Africa based Tree Machine Records and you can hear right from the first track, “The Hunt,” how the group is ready for something bigger. Ozturk’s Björk like vocals will instantly grab you as Fuji Kureta’s music ebbs and flows with soft beats and climatic runs. The entire EP has a tense undertone vibe which helps it stand out as their sharp electronic turns have the precision of Radiohead’s later era records. At times, Yetunde is like watching a drip of water release slowly and fall to the ground. You are never quite sure when it is going to detach but when it does an entire new energy is created. Fuji Kureta have created that same motion and feeling on Yetunde' - The Fire Note	Yetunde	2016-12-28 01:35:54.657+00	2016-12-28 01:35:54.657+00	26
\.


--
-- Name: AlbumReleases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"AlbumReleases_id_seq"', 49, true);


--
-- Data for Name: Artists; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Artists" (id, name, param, "createdAt", "updatedAt", "isCurrent") FROM stdin;
1	Austin Bey	austin-bey	2016-12-15 00:16:30.335+00	2016-12-17 00:35:57.612+00	t
2	Bartholin	bartholin	2016-12-15 00:18:17.316+00	2016-12-17 00:36:01.075+00	t
3	Blimp Rock	blimp-rock	2016-12-15 00:18:31.948+00	2016-12-17 00:36:02.621+00	t
4	EAZY	EAZY	2016-12-15 00:20:59.833+00	2016-12-17 00:36:04.049+00	t
5	Jon Dice	jon-dice	2016-12-15 00:21:57.862+00	2016-12-17 00:36:05.318+00	t
6	Ladycop	ladycop	2016-12-15 00:22:09.362+00	2016-12-17 00:36:07.034+00	t
7	Living Body	living-body	2016-12-15 00:22:36.564+00	2016-12-17 00:36:08.486+00	t
8	Living Hour	living-hour	2016-12-15 00:29:32.284+00	2016-12-17 00:36:10.352+00	t
9	!mindparade	!mindparade	2016-12-15 00:30:11.117+00	2016-12-17 00:36:12.554+00	t
10	Pony	pony	2016-12-15 00:30:22.522+00	2016-12-17 00:36:15.029+00	t
11	The Psychics	the-psychics	2016-12-15 00:30:43.612+00	2016-12-17 00:36:16.848+00	t
12	Shorebilly	shorebilly	2016-12-15 00:31:05.577+00	2016-12-17 00:36:19.906+00	t
13	Vows	vows	2016-12-15 00:31:16.065+00	2016-12-17 00:36:21.881+00	t
14	Wonderbitch	wonderbitch	2016-12-15 00:31:27.204+00	2016-12-17 00:36:23.582+00	t
15	WOOF.	WOOF.	2016-12-15 00:32:22.39+00	2016-12-17 00:36:25.715+00	t
16	You Are Number Six	you-are-number-six	2016-12-15 00:32:55.407+00	2016-12-17 00:36:28.103+00	t
17	Hypocrite in a Hippy Crypt	hypocrite-in-a-hippy-crypt	2016-12-15 00:33:39.751+00	2016-12-17 00:36:35.816+00	f
18	Bonfire John	bonfire-john	2016-12-28 00:42:58.44+00	2016-12-28 00:42:58.44+00	f
19	Magic MAchine	magic-machine	2016-12-28 00:43:40.478+00	2016-12-28 00:43:40.478+00	f
20	Hotbreath Tea	hotbreath-tea	2016-12-28 00:44:30.005+00	2016-12-28 00:44:30.005+00	f
21	Before I Was a Ghost	before-i-was-a-ghost	2016-12-28 00:45:32.836+00	2016-12-28 00:45:32.836+00	f
23	Boxboxbox	boxboxbox	2016-12-28 00:48:17.952+00	2016-12-28 00:48:17.952+00	f
24	Ender Belongs to Me	ender-belongs-to-me	2016-12-28 00:48:52.774+00	2016-12-28 00:48:52.774+00	f
25	The Danger O's	the-danger-os	2016-12-28 00:52:19.664+00	2016-12-28 00:52:19.664+00	f
26	Fuji Kureta	fuji-kureta	2016-12-28 00:53:44.978+00	2016-12-28 00:53:44.978+00	f
27	Pooter	pooter	2016-12-28 00:57:17.117+00	2016-12-28 00:57:17.117+00	f
28	The Stomping Academy	the-stomping-academy	2016-12-28 01:26:40.215+00	2016-12-28 01:26:40.215+00	f
\.


--
-- Name: Artists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Artists_id_seq"', 28, true);


--
-- Data for Name: BioSections; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "BioSections" (id, content, "sourceName", "sourceUrl", "createdAt", "updatedAt", "ArtistId") FROM stdin;
2	{"Music has been the only thing that's made complete sense to Austin. Born in an area of Baltimore where rap reigned supreme over all other genres of music, Austin found himself being the oddball in his neighborhood and school for deciding to branch off into other musical realms. Having produced rap music for years, Austin found himself bored and unhappy with the music he’s made; wanting something more out of the talents he’s acquired over time."}			2016-12-17 01:54:15.232+00	2016-12-17 01:54:15.232+00	1
3	{"Bartholin is like a conversation between friends about sex.  Debuting their first album and collaboration with Tree Machine Records, the duo Drew Danburry and Cat Leavy take turns singing over carefully, compelling tunes on this self-titled EP.  Delving into the deep crevasse of the inner psyche and stirring the pot of what makes us tick as human animals. Bartholin is an exploration into the Freudian subconscious and the end result is eargasmic.  The melody is soothing and pleasantly taxing throughout, snagging various heartstrings and melting into a sort of cryptic symbiosis."}			2016-12-17 22:44:46.565+00	2016-12-17 22:44:46.565+00	2
4	{"Blimp Rock is an innovative music cooperative with one simple goal: to purchase an airship and host the world’s first blimp-based music festival over Lake Ontario, through the sale of easy listening rock. On behalf of parent corporation Blimp Rock Enterprises, Blimp Rock frontman Peter Demakos writes simple tunes that hearken back to a simpler era – a time when hydrogen was loved and not feared for its combustible properties.","First market tested in 2013 with the release of self-titled album Blimp Rock, Blimp Rock’s comedic indie rock was a surprise success for Blimp Rock Enterprises, easily outpacing their previously top-performing investment in Rolodex futures. The band’s whimsical everyday subject matter and Demakos’ laconic delivery struck a cord with audiences worldwide, and the tour dates followed. Over a star-studded following year, the band has toured the world, presenting the Blimp Rock message in all the world’s finest cities: Paris, Peterborough, Berlin and Guelph."}	string	string	2016-12-17 22:45:31.705+00	2016-12-17 22:45:31.705+00	3
5	{"Co-Manager, producer, beatmaker, and DJ from Johannesburg, South Africa, EAZY started his musical adventure at an early age. Born into a family of music lovers, he quickly developed a love for the sounds of Golden age hip-hop, Kwaito, underground, and house music. As his family was always playing various genres around him, he grew to love and understand the power and energy of music. He started out writing at the early age of 10, moved on to dancing, and soon started making beats and producing. EAZY started composing tracks at 15 and around that time got involved with local artist which progressed to international collaborations with independent artists including Jboo Tha Bully, PEchi , Juzmi and many more. Releasing mixtapes with friends lead to forming a production duo with Blayze Deville called The Virtuosos. Together they took over the local scene by producing singles and mixtapes. EAZY also now DJ’s anything along the lines of deep tech, electro, techno, deep house, electronic, and dub step. With his ability to entertain the crowd and read their emotions, he has always able to make sure the crowd keeps moving. His genre specific versatility gives him the ability to switch and mix sounds on the decks that keep the crowd entertained with his dirty bass music leaving the crowd always wanting more of what he has to offer. EAZY is a true force to be reckoned with and he is a true entertainer now leading the development of the electronic side of Tree Machine Records from across the Atlantic."}	string	string	2016-12-17 22:48:54.988+00	2016-12-17 22:48:54.988+00	4
6	{"JON DICE is the project of Jeff Pupa started in 2008 after returning to the East Coast from Alaska. The project is an ever-changing endeavor through sectors of EDM. Jeff is also the vocalist and guitarist for dream-noir band, Vows. He resides in the far northern quadrants of Vermont. Embrace the dark","'The new Jon Dice track feels like a medically induced coma. The twisting melodies that remain below the fold comply with only the producers will for exposure rather than the listeners desire to catch a hook. ‘Same’ is a track that requires patience and grace. Patience because you wont hear it all the first time around as the interchange between elements is an ongoing endeavor that unfolds new moments upon each listen. Grace because, fuck me, it’s graceful.' – Dingus on Music"}	string	string	2016-12-17 22:50:01.746+00	2016-12-17 22:50:01.746+00	5
7	{"Ladycop is the band of girls down the street that runs your neighborhood in the daytime and runs through your mind at night.  They have been called the sirens of the sea on more than one occasion.  Backed by Alex Arnold on guitar, Charles Roldan on drums, and Kyle Houpt on bass, they're a dreamy and progressive outfit, lead by a three part vocal harmony.  Sit back and absorb the sound, but don't let your guard down!"}	string	string	2016-12-17 22:50:59.867+00	2016-12-17 22:50:59.867+00	6
8	{"Living Body is the new project from Leeds-based Chicagoan Jeff T. Smith (formerly, Juffage) featuring longtime collaborators Katie Harkin (Harkin, Sky Larkin, Wild Beasts, Sleater-Kinney) and Tom Evans (Vessels).  Rising from the ashes of their acclaimed “Sonic Cauldron” concert at Left Bank Leeds in 2013, the group is now augmented by new and additional live members Alice Rowan (Mayshe-Mayshe) & Sarah Statham (Esper Scout).  Expanding on the need for music to bring joy into the lives of others, and Smith’s fascination with the contortion of the pop song into a uniquely imaginative and immediate form, Living Body aims to exist in a world of skin and information overload in 2016."}	string	string	2016-12-17 22:51:36.423+00	2016-12-17 22:51:36.423+00	7
9	{"'Instead of trying to hop on the super-hip train along with bands such as DIIV or Beach Fossils, Living Hour’s music reaches way further back than the late ‘70s for inspiration. It has a quality much more akin to the lazy, balladic guitar moments of the late ‘50s and early ‘60s. The music here possesses a hazy quality more partial to old school guitar standards such as Santo and Johnny’s 'Sleep Walk' than anything of the more post-punk or shoegaze stripe' - Paste Magazine"}	string	string	2016-12-17 22:53:01.35+00	2016-12-17 22:53:01.35+00	8
10	{"!mindparade is a psych-pop project based in Bloomington, Indiana that started with the release of the 5-song 'Everything EP' in summer of 2011. Led by songwriter Alex Arnold, the band features a dynamic cast of musicians to form a live iteration of the project, often utilizing diverse textures such as brass hits, driving guitars, graceful string arrangements, and glitchy electronics."}	string	string	2016-12-17 22:54:04.59+00	2016-12-17 22:54:04.59+00	9
11	{"Pony formed in 2009 and released their official debut album the same year. They began as a post punk band and quickly gained notoriety from various Korean media outlets and fashion magazines. Tiring of the rock scene and their image's association with fashion, the band moved towards a more shoegazing, noise pop sound; releasing their ep, Little Apartment, in 2012. During this time they were featured by Fred Perry Subculture and released two music videos with the brand. Soon after they decided to stop all activities and took a three-year hiatus. They soon returned with their 2nd album, signing with TM Records."}	string	string	2016-12-17 22:55:14.366+00	2016-12-17 22:55:14.366+00	10
12	{"The Psychics (formerly known as Jerome and The Psychics) are a psychedelic music collective founded in 2010 by Jerome X. Spanning 5 years and numerous genres, The Psychics have explored numerous tropes of psychedelic music from the past 50 years and across the world with an innovative and explosively emotional live show. Hailing from the deepest regions of Rio de Janeiro's urban rainforest, The Psychics are known for featuring numerous collaborators to extend their hypnotically psychedelic and equally pop sound into even further dimensions. They can currently be found playing shows in Nashville, TN where the rock n' roll is loud, fast, and in your face."}	string	string	2016-12-17 22:57:30.526+00	2016-12-17 22:57:30.526+00	11
13	{"Shorebilly is the project of self-taught multi-instrumentalist and producer Rémi Alexandre playing guitar, bass and keyboard alongside various artists and bands such as Syd Matters, H-Burns, Mellow, etc. When speaking of artists that influenced him, Rémi mentions François de Roubaix's elegance, melodic evidence and taste for sound experiments, and Dennis Wilson, dark accursed surfer and outsider Beach Boy. He admires multi-instrumentalist Todd Rundgren for his work as a producer and his soulful writing. He also mentions his friends and spiritual fathers, the members of french touch band Mellow, who passed on to him a true passion for production. And eventually Syd matters band leader Jonathan Morali with whom he shared ten intense years on the road.","His debut 6 track record 'WipeOut!' is a colorful collection of songs that lead Rémi to confront himself musically, and apply his production skills to a personal project. The production is condensed, precise, focused on groove and melody, with an ambition to move listeners, as well as make them move. Behind his intricate writing lies pure stylistic freedom, and a will to brake all aesthetic and conceptual barriers. This ep was written and recorded as spontaneously as possible to avoid getting lost in long and complicated thought process. Shorebilly composes a singular and sincere music fit for all sensibilities, a hectic yet organic soundscape where pop and electronic music collide. Rémi Alexandre constantly pumps life and emotion into a synthetic universe of his own creation. This passionate and thin-skinned workaholic has decided to surf his own wave and 'Wipeout!' is his declaration of love for music."}	string	string	2016-12-17 22:58:43.964+00	2016-12-17 22:58:43.964+00	12
14	{"'This music is an altogether different take on Americana but it rightfully takes its place alongside more conventional forms. In the future though, This music will inevitably become a convention in itself and be marked out as being as quintessentially American as Hank Williams or The Beach Boys. Vows are part of that evolution of form and only they have any clue where it will take them. They are holding the map.' – Fresh Tracks"}			2016-12-17 22:59:40.055+00	2016-12-17 22:59:40.055+00	13
15	{"In the winter of 2012, Wonderbitch sprouted from a fertile galaxy of childhood friends and numerous stagnant projects in Bloomington, Indiana. Those in the cluster ready to break the heavy orbit of their liberal college town brought together their sounds- psychedelic, spiritual and progressive- and began to groove their way south (like a dancing starburst of sass) to Austin Texas, home of infinite gigs and the love of love.","From a weighty foundation of Pink Floyd, Genesis and Muse, Wonderbitch wraps up cool Steely Dan musicality with the danciness of Franz Ferdinand and the nostalgic sheen of smooth mid 80s pop. Wonderbitch currently writes, records and performs in Austin as they continue to cultivate their show into a lovingly explosive and enveloping experience to bring to stages large and medium.","Wonderbitch harnesses the transportive power of rock to take listeners on sophisticated flights of fancy. Citing psychedelic and 80s pop influence on their sound, they enchant with the visual aspects of their intriguing music videos and spirited live performances.","Traces of Bowie, Steely Dan, and Talking Heads decorate their tunes. Lyrically, their offerings wax New Age, yet the sound is mixed in the charred, weirder edges of alternative. Their whimsical songs explore starkly rendered feelings and subjects that allow them to resonate with an introspective but universal vibe."}			2016-12-17 23:00:21.181+00	2016-12-17 23:00:21.181+00	14
16	{"'Two guitars interlock nicely, weaving scales together and keeping the energy high, beefed up by a chugging bass. Bonislawski appears to get a bit antsy playing the 4/4 drum beats the genre requires, so just for fun he includes a staggering amount of fills and surplus beats not seen since the likes of Tre Cool or Travis Barker. Hints of New Found Glory mesh with The Foo Fighters, SR-71, and that one 90s song your friend’s boyfriend did at karaoke last week to create a whole that’ll get your head nodding, but won’t get your arms uncrossed.'","'In short, this track is so completely and totally stuck in the Y2K era that one almost feels compelled to warn its creator about 9/11. That being said, this track is also pitch-perfect for this opening montage, which concludes with Nick rolling up to school, just in the 'Nick of Time' (also film's title). Detention averted! For now…' - Tiny Mix Tapes"}			2016-12-17 23:01:21.487+00	2016-12-17 23:01:21.487+00	15
17	{"Born on 06/06 and fan of the British series 'The Prisoner' from which he takes his stage name, Theo began his solo project, You Are Number Six, in October 2013. Quickly gaining traction on soundcloud, the first EP was released in the US on ... 06/06, on the indie label YOUNG CUBS ­ Austin­, TX.","'Weird Tales' was warmly welcomed by many international blogs for its 80's influences and immediate melodies. Following the first EP, 5 EPs have been released, including 'Lens Flares' and the track 'Palimpsest' (featured on soundcloud's homepage for a few weeks). You Are Number Six composes his music using real instruments (guitar, bass, keyboard) and drum machines; he produces his own mix, and also works on artwork and an interactive web site.","At the same time, he started to work on other projects in 2014: Lights of the Coast, a duet with Axel, alias Pun Collins, a french electronic artist, and Little Dinosaurs in 2016, for which You Are Number Six is the songwriter and the main composer of the melodies."}			2016-12-17 23:01:56.077+00	2016-12-17 23:01:56.077+00	16
\.


--
-- Name: BioSections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"BioSections_id_seq"', 17, true);


--
-- Data for Name: ContactLists; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "ContactLists" (id, "bandEmail", "bandPhone", "bandMailingAddress", "bookingManagerEmail", "bookingManagerPhone", "generalManagerEmail", "generalManagerPhone", "createdAt", "updatedAt", "ArtistId") FROM stdin;
1	drewdanburry@gmail.com	\N	\N	drewdanburry@gmail.com	\N	drewdanburry@gmail.com	\N	2016-12-16 23:18:28.022+00	2016-12-16 23:18:28.022+00	2
2	blimprockenterprises@gmail.com	\N	\N	blimprockenterprises@gmail.com	\N	blimprockenterprises@gmail.com	\N	2016-12-16 23:28:30.902+00	2016-12-16 23:28:30.902+00	3
3	tloueazm@gmail.com	\N	\N	tloueazm@gmail.com	\N	tloueazm@gmail.com	\N	2016-12-16 23:33:26.859+00	2016-12-16 23:33:26.859+00	4
4	alhakeembey@gmail.com	\N	\N	alhakeembey@gmail.com	\N	alhakeembey@gmail.com	\N	2016-12-16 23:36:49.484+00	2016-12-16 23:36:49.484+00	1
5	Dice.jon@gmail.com	\N	\N	Dice.jon@gmail.com	\N	Dice.jon@gmail.com	\N	2016-12-16 23:38:07.933+00	2016-12-16 23:38:07.933+00	5
6	ldycpmusic@gmail.com	\N	\N	ldycpmusic@gmail.com	\N	ldycpmusic@gmail.com	\N	2016-12-16 23:38:45.981+00	2016-12-16 23:38:45.981+00	6
7	hq@livingbodylife.com	\N	\N	juffage@gmail.com	\N	juffage@gmail.com	\N	2016-12-16 23:39:25.735+00	2016-12-16 23:39:25.735+00	7
8	livinghourband@gmail.com	\N	\N	livinghourband@gmail.com	\N	stu@mightycypress.com	\N	2016-12-16 23:39:56.977+00	2016-12-16 23:39:56.977+00	8
9	mindparadebooking@gmail.com	\N	\N	mindparadebooking@gmail.com	\N	mindparadebooking@gmail.com	\N	2016-12-16 23:40:44.406+00	2016-12-16 23:40:44.406+00	9
10	thebooklovers1@gmail.com	\N	\N	thebooklovers1@gmail.com	\N	thebooklovers1@gmail.com	\N	2016-12-16 23:41:23.508+00	2016-12-16 23:41:23.508+00	10
11	psychicmediafront@gmail.com	\N	\N	psychicmediafront@gmail.com	\N	psychicmediafront@gmail.com	\N	2016-12-16 23:41:54.349+00	2016-12-16 23:41:54.349+00	11
12	remialexandre@gmail.com	\N	\N	remialexandre@gmail.com	\N	remialexandre@gmail.com	\N	2016-12-16 23:42:26.438+00	2016-12-16 23:42:26.438+00	12
13	vowsmusic@gmail.com	\N	\N	vowsmusic@gmail.com	\N	vowsmusic@gmail.com	\N	2016-12-16 23:42:57.58+00	2016-12-16 23:42:57.58+00	13
14	wb.lovesyou@gmail.com	\N	\N	wb.lovesyou@gmail.com	\N	wb.lovesyou@gmail.com	\N	2016-12-16 23:43:25.746+00	2016-12-16 23:43:25.746+00	14
15	kelan.roman@gmail.com	\N	\N	kelan.roman@gmail.com	\N	kelan.roman@gmail.com	\N	2016-12-16 23:44:04.755+00	2016-12-16 23:44:04.755+00	15
16	number6@slynt.com	\N	\N	number6@slynt.com	\N	number6@slynt.com	\N	2016-12-16 23:45:17.368+00	2016-12-16 23:45:17.368+00	16
\.


--
-- Name: ContactLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"ContactLists_id_seq"', 16, true);


--
-- Data for Name: EmbeddableMedia; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "EmbeddableMedia" (id, title, "linkUrl", "embedUrl", "createdAt", "updatedAt", "ArtistId", type) FROM stdin;
2	Austin Bey	https://www.youtube.com/watch?v=Km2HLpvVWs4&list=PL7nsunlSnhp2g4itFO4KvbhvpkV-xQpu4	https://www.youtube.com/embed/Km2HLpvVWs4?list=PL7nsunlSnhp2g4itFO4KvbhvpkV-xQpu4	2016-12-17 14:25:47.788+00	2016-12-17 14:25:47.788+00	1	video
3	Peristalsis	https://soundcloud.com/ddanburry/peristalsis	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/280593026&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:06:58.818+00	2016-12-17 23:06:58.818+00	2	featuredTrack
4	Interview on CBC Afternoon Drive	https://soundcloud.com/blimp-rock/interview-on-cbc-afternoon-drive	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/222345434&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:08:46.05+00	2016-12-17 23:08:46.05+00	3	featuredTrack
5	Butt Bass	https://soundcloud.com/eazydarealeazy	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/157407089&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:09:53.019+00	2016-12-17 23:09:53.019+00	4	featuredTrack
6	La Mezcla De Los Angeles Negros	https://soundcloud.com/jonaciddice/la-mezcla-de-los-angeles-negros	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/229948401&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:18:26.824+00	2016-12-17 23:18:26.824+00	5	featuredTrack
7	Aether	https://soundcloud.com/ldycp/aether	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/283692834&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:25:06.415+00	2016-12-17 23:25:06.415+00	6	featuredTrack
8	I Recollect	https://soundcloud.com/livingbodylife/i-recollect	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/285881776&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:26:24.808+00	2016-12-17 23:26:24.808+00	7	featuredTrack
9	Miss Emerald Green	https://soundcloud.com/treemachinerecords/living-hour-miss-emerald-green	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/193036261&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:27:59.146+00	2016-12-17 23:27:59.146+00	8	featuredTrack
10	The Coming Home	https://soundcloud.com/mindparade/the-coming-home	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/197373253&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:29:09.308+00	2016-12-17 23:29:09.308+00	9	featuredTrack
11	When Your Love Comes to Grave	https://soundcloud.com/ponyofficial/6-when-your-love-comes-to	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/211333490&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:30:46.764+00	2016-12-17 23:30:46.764+00	10	featuredTrack
12	Sowejtische Besatzungszone	https://soundcloud.com/the-psychics-1/sowejtische-besatzungszone	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248115529&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:32:28.449+00	2016-12-17 23:32:28.449+00	11	featuredTrack
13	No Grudges	https://soundcloud.com/shorebilly/05-shorebilly-no-grudges-44100hz-16bits-fr62t1600027	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/282241386&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:34:00.156+00	2016-12-17 23:34:00.156+00	12	featuredTrack
14	How Can You Feel	https://soundcloud.com/sectionsignrecords/vows-how-can-you-feel	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/192821385&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:36:21.226+00	2016-12-17 23:36:21.226+00	13	featuredTrack
15	San Diego	https://soundcloud.com/wblovesyou/04-san-diego	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208506086&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:37:41.62+00	2016-12-17 23:37:41.62+00	14	featuredTrack
17	Tremor	https://soundcloud.com/iamwoof/tremor-1	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/232249890&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true	2016-12-17 23:40:15.458+00	2016-12-17 23:40:15.458+00	15	featuredTrack
18	Magic	https://soundcloud.com/you-are-number-six/magic	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135339659&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 23:42:21.207+00	2016-12-17 23:42:21.207+00	16	featuredTrack
19	string	string	https://player.vimeo.com/video/123866794	2016-12-18 00:32:44.259+00	2016-12-18 00:32:44.259+00	3	video
25	string	string	https://www.youtube.com/embed/2zFlXoHq_Rc	2016-12-18 00:44:49.129+00	2016-12-18 00:44:49.129+00	6	video
20	string	string	https://player.vimeo.com/video/81965145	2016-12-18 00:33:49.864+00	2016-12-18 00:38:10.172+00	3	video
22	string	string	https://player.vimeo.com/video/103005811	2016-12-18 00:39:15.198+00	2016-12-18 00:41:07.91+00	3	video
21	string	string	https://player.vimeo.com/video/93918716	2016-12-18 00:38:50.69+00	2016-12-18 00:41:43.346+00	3	video
23	string	string	https://www.youtube.com/embed/kkMpF6G1Uz0	2016-12-18 00:43:36.564+00	2016-12-18 00:43:36.564+00	5	video
24	string	string	https://player.vimeo.com/video/112750397	2016-12-18 00:43:57.482+00	2016-12-18 00:43:57.482+00	5	video
26	string	string	https://www.youtube.com/embed/QEmGebi_mrc	2016-12-18 00:45:04.949+00	2016-12-18 00:45:04.949+00	6	video
27	string	string	https://www.youtube.com/embed/xvnwtc7x5zY	2016-12-18 00:45:54.462+00	2016-12-18 00:45:54.462+00	7	video
28	string	string	https://www.youtube.com/embed/DQvPoaPPNB8	2016-12-18 00:47:35.624+00	2016-12-18 00:47:35.624+00	8	video
29	string	string	https://player.vimeo.com/video/147126882	2016-12-18 00:48:10.547+00	2016-12-18 00:48:10.547+00	8	video
30	string	string	https://www.youtube.com/embed/IvpyXtI-FrU	2016-12-18 00:48:27.518+00	2016-12-18 00:48:27.518+00	8	video
31	string	string	https://www.youtube.com/embed/IQVpAX2vlw4	2016-12-18 00:48:44.787+00	2016-12-18 00:48:44.787+00	8	video
32	string	string	https://www.youtube.com/embed/W5KzMDFwIZY	2016-12-18 00:56:18.122+00	2016-12-18 00:56:18.122+00	9	video
33	string	string	https://www.youtube.com/embed/x9_1ia_nB_E	2016-12-18 00:56:35.802+00	2016-12-18 00:56:35.802+00	9	video
34	string	string	https://www.youtube.com/embed/NWFWMeqRkUs	2016-12-18 00:58:05.722+00	2016-12-18 00:58:05.722+00	10	video
35	string	string	https://www.youtube.com/embed/lqYPLm677gc	2016-12-18 00:58:25.164+00	2016-12-18 00:58:25.164+00	10	video
36	string	string	https://www.youtube.com/embed/fxXSPv7GuDU	2016-12-18 00:59:45.697+00	2016-12-18 00:59:45.697+00	11	video
37	string	string	https://www.youtube.com/embed/UfWnYe5z6MM	2016-12-18 01:00:00.889+00	2016-12-18 01:00:00.889+00	11	video
38	string	string	https://www.youtube.com/embed/xKNKlF4oFt8	2016-12-18 01:01:09.261+00	2016-12-18 01:01:09.261+00	12	video
39	string	string	https://www.youtube.com/embed/vobWIOOFz08	2016-12-18 01:01:26.879+00	2016-12-18 01:01:26.879+00	12	video
40	string	string	https://www.youtube.com/embed/hS37jkGuPno	2016-12-18 01:04:40.878+00	2016-12-18 01:04:40.878+00	14	video
41	string	string	https://www.youtube.com/embed/NxiGZ0jCA80	2016-12-18 01:05:05.107+00	2016-12-18 01:05:05.107+00	14	video
42	string	string	https://www.youtube.com/embed/velaF1pP_NQ	2016-12-18 01:05:23.796+00	2016-12-18 01:05:23.796+00	14	video
43	string	string	https://www.youtube.com/embed/QBafNh3Y5JM	2016-12-18 01:05:36.529+00	2016-12-18 01:05:36.529+00	14	video
44	string	string	https://www.youtube.com/embed/Ersysljbgg0	2016-12-18 01:06:36.163+00	2016-12-18 01:06:36.163+00	15	video
45	string	string	https://www.youtube.com/embed/G3g0TypFrAI	2016-12-18 01:06:51.604+00	2016-12-18 01:06:51.604+00	15	video
46	string	string	https://www.youtube.com/embed/0qe9goIO-Z8	2016-12-18 01:07:07.891+00	2016-12-18 01:07:07.891+00	15	video
47	string	string	https://www.youtube.com/embed/aI7PcXCaqkM	2016-12-18 01:07:45.619+00	2016-12-18 01:07:45.619+00	15	video
48	string	string	https://www.youtube.com/embed/E_VK4PRDZwk	2016-12-18 01:09:00.811+00	2016-12-18 01:09:00.811+00	16	video
49	string	string	https://www.youtube.com/embed/GUttvVkgbp8	2016-12-18 01:09:14.314+00	2016-12-18 01:09:14.314+00	16	video
1	Blu	https://soundcloud.com/austin-bey/blu	https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/306829495&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false	2016-12-17 02:13:04.57+00	2017-02-10 02:45:40.044+00	1	featuredTrack
\.


--
-- Name: EmbeddableMedia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"EmbeddableMedia_id_seq"', 49, true);


--
-- Data for Name: FeaturedAlbumLists; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "FeaturedAlbumLists" (id, "albumReleaseIds", "createdAt", "updatedAt") FROM stdin;
1	{26,27,28,29,19}	2016-12-17 20:15:31.819+00	2016-12-31 23:18:55.033+00
\.


--
-- Name: FeaturedAlbumLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"FeaturedAlbumLists_id_seq"', 1, false);


--
-- Data for Name: FeaturedSongLists; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "FeaturedSongLists" (id, "songIds", "createdAt", "updatedAt") FROM stdin;
1	{3,7,4,6,5,2,8}	2017-01-02 19:40:16.058+00	2017-02-10 02:49:00.711+00
\.


--
-- Name: FeaturedSongLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"FeaturedSongLists_id_seq"', 1, true);


--
-- Data for Name: Files; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Files" (id, name, size, type, identifier, "createdAt", "updatedAt", "AlbumReleaseId", "ArtistId", "MerchItemId", "SongId", "UserId", label, "imageUrl") FROM stdin;
184	austinbey.jpg	0	.jpg	artistTileFront	2016-12-31 20:57:28.798+00	2016-12-31 20:57:28.798+00	\N	1	\N	\N	\N	\N	\N
185	bartholin.jpg	0	.jpg	artistTileFront	2016-12-31 20:58:04.542+00	2016-12-31 20:58:04.542+00	\N	2	\N	\N	\N	\N	\N
186	bonfirejohn.jpg	0	.jpg	artistTileFront	2016-12-31 20:58:36.623+00	2016-12-31 20:58:36.623+00	\N	18	\N	\N	\N	\N	\N
187	boxboxbox.jpg	0	.jpg	artistTileFront	2016-12-31 20:58:52.49+00	2016-12-31 20:58:52.49+00	\N	23	\N	\N	\N	\N	\N
188	eazy.jpg	0	.jpg	artistTileFront	2016-12-31 20:59:24.428+00	2016-12-31 20:59:24.428+00	\N	4	\N	\N	\N	\N	\N
189	blimprock.jpg	0	.jpg	artistTileFront	2016-12-31 21:00:16.82+00	2016-12-31 21:00:16.82+00	\N	3	\N	\N	\N	\N	\N
190	jondice.jpg	0	.jpg	artistTileFront	2016-12-31 21:02:29.065+00	2016-12-31 21:02:29.065+00	\N	5	\N	\N	\N	\N	\N
191	ladycop.jpg	0	.jpg	artistTileFront	2016-12-31 21:02:49.295+00	2016-12-31 21:02:49.295+00	\N	6	\N	\N	\N	\N	\N
192	livingbody.jpg	0	.jpg	artistTileFront	2016-12-31 21:03:06.374+00	2016-12-31 21:03:06.374+00	\N	7	\N	\N	\N	\N	\N
193	livinghour.jpg	0	.jpg	artistTileFront	2016-12-31 21:03:22.126+00	2016-12-31 21:03:22.126+00	\N	8	\N	\N	\N	\N	\N
194	magicmachine.jpg	0	.jpg	artistTileFront	2016-12-31 21:03:40.042+00	2016-12-31 21:03:40.042+00	\N	19	\N	\N	\N	\N	\N
195	mindparade.jpg	0	.jpg	artistTileFront	2016-12-31 21:04:12.471+00	2016-12-31 21:04:12.471+00	\N	9	\N	\N	\N	\N	\N
196	pony.jpg	0	.jpg	artistTileFront	2016-12-31 21:04:34.564+00	2016-12-31 21:04:34.564+00	\N	10	\N	\N	\N	\N	\N
197	shorebilly.jpg	0	.jpg	artistTileFront	2016-12-31 21:04:46.632+00	2016-12-31 21:04:46.632+00	\N	12	\N	\N	\N	\N	\N
198	thepsychics.jpg	0	.jpg	artistTileFront	2016-12-31 21:05:02.486+00	2016-12-31 21:05:02.486+00	\N	11	\N	\N	\N	\N	\N
199	vows.jpg	0	.jpg	artistTileFront	2016-12-31 21:05:12.795+00	2016-12-31 21:05:12.795+00	\N	13	\N	\N	\N	\N	\N
200	wonderbitch.jpg	0	.jpg	artistTileFront	2016-12-31 21:05:22.288+00	2016-12-31 21:05:22.288+00	\N	14	\N	\N	\N	\N	\N
201	woof.jpg	0	.jpg	artistTileFront	2016-12-31 21:05:32.818+00	2016-12-31 21:05:32.818+00	\N	15	\N	\N	\N	\N	\N
202	youarenumbersix.jpg	0	.jpg	artistTileFront	2016-12-31 21:05:45.067+00	2016-12-31 21:05:45.067+00	\N	16	\N	\N	\N	\N	\N
207	body-is-working.jpg	0	.jpg	albumCover	2016-12-31 21:24:34.185+00	2016-12-31 21:24:34.185+00	27	7	\N	\N	\N	\N	\N
208	undercurrent.jpg	0	.jpg	albumCover	2016-12-31 21:27:19.78+00	2016-12-31 21:27:19.78+00	29	6	\N	\N	\N	\N	\N
209	bartholin.jpg	0	.jpg	albumCover	2016-12-31 21:28:17.872+00	2016-12-31 21:28:17.872+00	28	2	\N	\N	\N	\N	\N
210	treated.jpg	0	.jpg	albumCover	2016-12-31 21:28:46.626+00	2016-12-31 21:28:46.626+00	26	1	\N	\N	\N	\N	\N
211	vhs-dreams.jpg	0	.jpg	albumCover	2016-12-31 21:29:41.674+00	2016-12-31 21:29:41.674+00	33	16	\N	\N	\N	\N	\N
212	wipeout.jpg	0	.jpg	albumCover	2016-12-31 21:30:52.426+00	2016-12-31 21:30:52.426+00	32	12	\N	\N	\N	\N	\N
213	4x3.jpg	0	.jpg	albumCover	2016-12-31 21:31:34.805+00	2016-12-31 21:31:34.805+00	30	11	\N	\N	\N	\N	\N
214	bad-connection.jpg	0	.jpg	albumCover	2016-12-31 21:32:22.782+00	2016-12-31 21:32:22.782+00	23	15	\N	\N	\N	\N	\N
215	dead-mystics.jpg	0	.jpg	albumCover	2016-12-31 21:33:15.046+00	2016-12-31 21:33:15.046+00	21	9	\N	\N	\N	\N	\N
216	i-dont-want-to-open-the-window-to-the-outside-world.jpg	0	.jpg	albumCover	2016-12-31 21:33:56.975+00	2016-12-31 21:33:56.975+00	22	10	\N	\N	\N	\N	\N
217	wonderbitch.jpg	0	.jpg	albumCover	2016-12-31 21:35:13.895+00	2016-12-31 21:35:13.895+00	17	14	\N	\N	\N	\N	\N
218	music-for-good-ears.jpg	0	.jpg	albumCover	2016-12-31 21:35:50.508+00	2016-12-31 21:35:50.508+00	20	4	\N	\N	\N	\N	\N
219	living-hour.jpg	0	.jpg	albumCover	2016-12-31 21:36:19.52+00	2016-12-31 21:36:19.52+00	19	8	\N	\N	\N	\N	\N
220	sophomore-slump.jpg	0	.jpg	albumCover	2016-12-31 21:36:58.623+00	2016-12-31 21:36:58.623+00	13	3	\N	\N	\N	\N	\N
221	turn-it-up.jpg	0	.jpg	albumCover	2016-12-31 21:39:02.384+00	2016-12-31 21:39:02.384+00	48	25	\N	\N	\N	\N	\N
222	woof.jpg	0	.jpg	albumCover	2016-12-31 21:49:06.733+00	2016-12-31 21:49:06.733+00	18	15	\N	\N	\N	\N	\N
224	soak.jpg	0	.jpg	albumCover	2016-12-31 21:50:55.418+00	2016-12-31 21:50:55.418+00	15	5	\N	\N	\N	\N	\N
225	jon-dice-presents-dubcake-volume-1.jpg	0	.jpg	albumCover	2016-12-31 21:51:34.685+00	2016-12-31 21:51:34.685+00	16	5	\N	\N	\N	\N	\N
226	a-better-way.jpg	0	.jpg	albumCover	2016-12-31 21:51:55.902+00	2016-12-31 21:51:55.902+00	14	5	\N	\N	\N	\N	\N
228	artifacts.jpg	0	.jpg	albumCover	2016-12-31 21:59:27.889+00	2016-12-31 21:59:27.889+00	46	24	\N	\N	\N	\N	\N
229	college.jpg	0	.jpg	albumCover	2016-12-31 22:01:06.094+00	2016-12-31 22:01:06.094+00	47	18	\N	\N	\N	\N	\N
230	call-you-on-it.jpg	0	.jpg	albumCover	2016-12-31 22:01:36.905+00	2016-12-31 22:01:36.905+00	11	5	\N	\N	\N	\N	\N
231	black-blood-stains.jpg	0	.jpg	albumCover	2016-12-31 22:02:15.543+00	2016-12-31 22:02:15.543+00	10	4	\N	\N	\N	\N	\N
232	vows.jpg	0	.jpg	albumCover	2016-12-31 22:03:13.227+00	2016-12-31 22:03:13.227+00	8	13	\N	\N	\N	\N	\N
234	dive.jpg	0	.jpg	albumCover	2016-12-31 22:04:27.129+00	2016-12-31 22:04:27.129+00	45	23	\N	\N	\N	\N	\N
235	only-the-beginning.jpg	0	.jpg	albumCover	2016-12-31 22:06:03.947+00	2016-12-31 22:06:03.947+00	44	19	\N	\N	\N	\N	\N
236	happy-family.jpg	0	.jpg	albumCover	2016-12-31 22:06:56.74+00	2016-12-31 22:06:56.74+00	43	28	\N	\N	\N	\N	\N
237	hero.jpg	0	.jpg	albumCover	2016-12-31 22:10:00.182+00	2016-12-31 22:10:00.182+00	12	9	\N	\N	\N	\N	\N
239	yetunde.jpg	0	.jpg	albumCover	2016-12-31 22:13:54.697+00	2016-12-31 22:13:54.697+00	49	26	\N	\N	\N	\N	\N
240	0.jpg	0	.jpg	albumCover	2016-12-31 22:15:08.285+00	2016-12-31 22:15:08.285+00	9	13	\N	\N	\N	\N	\N
241	dance-floor-secrets.jpg	0	.jpg	albumCover	2016-12-31 22:32:33.064+00	2016-12-31 22:32:33.064+00	7	4	\N	\N	\N	\N	\N
242	loves-you.jpg	0	.jpg	albumCover	2016-12-31 22:33:06.688+00	2016-12-31 22:33:06.688+00	6	14	\N	\N	\N	\N	\N
243	blimp-rock.jpg	0	.jpg	albumCover	2016-12-31 22:33:36.544+00	2016-12-31 22:33:36.544+00	5	3	\N	\N	\N	\N	\N
244	stranger-things.jpg	0	.jpg	albumCover	2016-12-31 22:34:06.24+00	2016-12-31 22:34:06.24+00	4	13	\N	\N	\N	\N	\N
245	tweaker-ii.jpg	0	.jpg	albumCover	2016-12-31 22:34:55.592+00	2016-12-31 22:34:55.592+00	3	17	\N	\N	\N	\N	\N
246	intricate-circuits.jpg	0	.jpg	albumCover	2016-12-31 22:35:38.477+00	2016-12-31 22:35:38.477+00	42	27	\N	\N	\N	\N	\N
247	everything-is-happening.jpg	0	.jpg	albumCover	2016-12-31 22:36:17.276+00	2016-12-31 22:36:17.276+00	2	9	\N	\N	\N	\N	\N
248	before-i-was-a-ghost.jpg	0	.jpg	albumCover	2016-12-31 22:37:12.402+00	2016-12-31 22:37:12.402+00	40	21	\N	\N	\N	\N	\N
249	one-hungry-acre.jpg	0	.jpg	albumCover	2016-12-31 22:38:04.941+00	2016-12-31 22:38:04.941+00	38	20	\N	\N	\N	\N	\N
250	why-so-routine.jpg	0	.jpg	albumCover	2016-12-31 22:41:59.405+00	2016-12-31 22:41:59.405+00	37	19	\N	\N	\N	\N	\N
251	gather-round.jpg	0	.jpg	albumCover	2016-12-31 23:07:56.647+00	2016-12-31 23:07:56.647+00	41	18	\N	\N	\N	\N	\N
252	making-the-most.jpg	0	.jpg	albumCover	2016-12-31 23:08:29.403+00	2016-12-31 23:08:29.403+00	36	18	\N	\N	\N	\N	\N
253	early-life.jpg	0	.jpg	albumCover	2016-12-31 23:09:05.613+00	2016-12-31 23:09:05.613+00	39	19	\N	\N	\N	\N	\N
254	tweaker-in-the-park.jpg	0	.jpg	albumCover	2016-12-31 23:09:40.71+00	2016-12-31 23:09:40.71+00	35	17	\N	\N	\N	\N	\N
255	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:34:37.498+00	2016-12-31 23:34:37.498+00	\N	1	\N	\N	\N	\N	\N
256	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:26.137+00	2016-12-31 23:36:26.137+00	\N	2	\N	\N	\N	\N	\N
257	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:28.988+00	2016-12-31 23:36:28.988+00	\N	3	\N	\N	\N	\N	\N
258	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:31.971+00	2016-12-31 23:36:31.971+00	\N	4	\N	\N	\N	\N	\N
259	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:35.354+00	2016-12-31 23:36:35.354+00	\N	5	\N	\N	\N	\N	\N
260	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:38.798+00	2016-12-31 23:36:38.798+00	\N	6	\N	\N	\N	\N	\N
261	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:41.924+00	2016-12-31 23:36:41.924+00	\N	7	\N	\N	\N	\N	\N
262	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:45.05+00	2016-12-31 23:36:45.05+00	\N	8	\N	\N	\N	\N	\N
263	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:47.861+00	2016-12-31 23:36:47.861+00	\N	9	\N	\N	\N	\N	\N
264	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:50.964+00	2016-12-31 23:36:50.964+00	\N	10	\N	\N	\N	\N	\N
265	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:53.573+00	2016-12-31 23:36:53.573+00	\N	11	\N	\N	\N	\N	\N
266	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:56.276+00	2016-12-31 23:36:56.276+00	\N	12	\N	\N	\N	\N	\N
267	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:36:59.323+00	2016-12-31 23:36:59.323+00	\N	13	\N	\N	\N	\N	\N
268	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:37:02.231+00	2016-12-31 23:37:02.231+00	\N	14	\N	\N	\N	\N	\N
269	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:37:04.957+00	2016-12-31 23:37:04.957+00	\N	15	\N	\N	\N	\N	\N
270	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:37:08.138+00	2016-12-31 23:37:08.138+00	\N	16	\N	\N	\N	\N	\N
271	featured-image.jpg	0	.jpg	featuredImage	2016-12-31 23:37:13.722+00	2016-12-31 23:37:13.722+00	\N	17	\N	\N	\N	\N	\N
272	bey.jpg	0	.jpg	photosCoverImage	2016-12-31 23:40:54.86+00	2016-12-31 23:40:54.86+00	\N	1	\N	\N	\N	\N	\N
274	band.jpg	0	.jpg	photosCoverImage	2016-12-31 23:57:22.465+00	2016-12-31 23:57:22.465+00	\N	3	\N	\N	\N	\N	\N
276	group.jpg	0	.jpg	photo	2017-01-01 00:03:01.94+00	2017-01-01 00:03:01.94+00	\N	3	\N	\N	\N	\N	\N
277	live.jpg	0	.jpg	photo	2017-01-01 00:03:10.587+00	2017-01-01 00:03:10.587+00	\N	3	\N	\N	\N	\N	\N
278	blimp-rock-enterprises.jpg	0	.jpg	photo	2017-01-01 00:04:00.767+00	2017-01-01 00:04:00.767+00	\N	3	\N	\N	\N	\N	\N
279	dj4.jpg	0	.jpg	photosCoverImage	2017-01-01 18:25:43.23+00	2017-01-01 18:25:43.23+00	\N	4	\N	\N	\N	\N	\N
280	1.jpg	0	.jpg	photo	2017-01-01 18:25:56.381+00	2017-01-01 18:25:56.381+00	\N	4	\N	\N	\N	\N	\N
281	2.jpg	0	.jpg	photo	2017-01-01 18:25:59.052+00	2017-01-01 18:25:59.052+00	\N	4	\N	\N	\N	\N	\N
282	3.jpg	0	.jpg	photo	2017-01-01 18:26:02.418+00	2017-01-01 18:26:02.418+00	\N	4	\N	\N	\N	\N	\N
283	4.jpg	0	.jpg	photo	2017-01-01 18:26:06.073+00	2017-01-01 18:26:06.073+00	\N	4	\N	\N	\N	\N	\N
284	5.jpg	0	.jpg	photo	2017-01-01 18:26:11.352+00	2017-01-01 18:26:11.352+00	\N	4	\N	\N	\N	\N	\N
285	chillin.jpg	0	.jpg	photo	2017-01-01 18:26:17.192+00	2017-01-01 18:26:17.192+00	\N	4	\N	\N	\N	\N	\N
286	eazy.jpg	0	.jpg	photo	2017-01-01 18:26:23.463+00	2017-01-01 18:26:23.463+00	\N	4	\N	\N	\N	\N	\N
287	laugh.jpg	0	.jpg	photo	2017-01-01 18:26:27.797+00	2017-01-01 18:26:27.797+00	\N	4	\N	\N	\N	\N	\N
288	talk-trash.jpg	0	.jpg	photo	2017-01-01 18:26:32.004+00	2017-01-01 18:26:32.004+00	\N	4	\N	\N	\N	\N	\N
289	city.jpg	0	.jpg	photosCoverImage	2017-01-01 18:27:19.577+00	2017-01-01 18:27:19.577+00	\N	5	\N	\N	\N	\N	\N
291	dicepuppet.jpg	0	.jpg	photo	2017-01-01 18:27:37.076+00	2017-01-01 18:27:37.076+00	\N	5	\N	\N	\N	\N	\N
292	alex.jpg	0	.jpg	photosCoverImage	2017-01-01 18:28:16.186+00	2017-01-01 18:28:16.186+00	\N	6	\N	\N	\N	\N	\N
293	cassette.jpg	0	.jpg	photo	2017-01-01 18:28:25.919+00	2017-01-01 18:28:25.919+00	\N	6	\N	\N	\N	\N	\N
295	chelsea.jpg	0	.jpg	photo	2017-01-01 18:28:34.878+00	2017-01-01 18:28:34.878+00	\N	6	\N	\N	\N	\N	\N
296	studio.jpg	0	.jpg	photo	2017-01-01 18:28:38.912+00	2017-01-01 18:28:38.912+00	\N	6	\N	\N	\N	\N	\N
297	three.jpg	0	.jpg	photo	2017-01-01 18:28:42.895+00	2017-01-01 18:28:42.895+00	\N	6	\N	\N	\N	\N	\N
298	logo.jpg	0	.jpg	photo	2017-01-01 18:28:48.488+00	2017-01-01 18:28:48.488+00	\N	6	\N	\N	\N	\N	\N
299	grafitti.jpg	0	.jpg	photosCoverImage	2017-01-01 18:30:01.16+00	2017-01-01 18:30:01.16+00	\N	7	\N	\N	\N	\N	\N
300	band.jpg	0	.jpg	photo	2017-01-01 18:30:11.904+00	2017-01-01 18:30:11.904+00	\N	7	\N	\N	\N	\N	\N
301	gear.jpg	0	.jpg	photo	2017-01-01 18:30:15.261+00	2017-01-01 18:30:15.261+00	\N	7	\N	\N	\N	\N	\N
302	livingbody.jpg	0	.jpg	photo	2017-01-01 18:30:24.256+00	2017-01-01 18:30:24.256+00	\N	7	\N	\N	\N	\N	\N
303	shirts.jpg	0	.jpg	photo	2017-01-01 18:30:27.694+00	2017-01-01 18:30:27.694+00	\N	7	\N	\N	\N	\N	\N
304	jeff.jpg	0	.jpg	photo	2017-01-01 18:30:31.581+00	2017-01-01 18:30:31.581+00	\N	7	\N	\N	\N	\N	\N
305	90s.jpg	0	.jpg	photosCoverImage	2017-01-01 18:31:37.05+00	2017-01-01 18:31:37.05+00	\N	8	\N	\N	\N	\N	\N
306	gil.jpg	0	.jpg	photo	2017-01-01 18:31:45.869+00	2017-01-01 18:31:45.869+00	\N	8	\N	\N	\N	\N	\N
307	livinghour1.jpg	0	.jpg	photo	2017-01-01 18:31:52.291+00	2017-01-01 18:31:52.291+00	\N	8	\N	\N	\N	\N	\N
308	livinghour4.jpg	0	.jpg	photo	2017-01-01 18:31:56.962+00	2017-01-01 18:31:56.962+00	\N	8	\N	\N	\N	\N	\N
309	livinghour7.jpg	0	.jpg	photo	2017-01-01 18:32:00.055+00	2017-01-01 18:32:00.055+00	\N	8	\N	\N	\N	\N	\N
310	fullband.gif	0	.gif	photo	2017-01-01 18:32:10.136+00	2017-01-01 18:32:10.136+00	\N	8	\N	\N	\N	\N	\N
311	alex-studio.jpg	0	.jpg	photosCoverImage	2017-01-01 18:33:14.299+00	2017-01-01 18:33:14.299+00	\N	9	\N	\N	\N	\N	\N
312	alex.png	0	.png	photo	2017-01-01 18:34:06.227+00	2017-01-01 18:34:06.227+00	\N	9	\N	\N	\N	\N	\N
313	chelsea.png	0	.png	photo	2017-01-01 18:34:09.595+00	2017-01-01 18:34:09.595+00	\N	9	\N	\N	\N	\N	\N
314	chuck.png	0	.png	photo	2017-01-01 18:34:12.598+00	2017-01-01 18:34:12.598+00	\N	9	\N	\N	\N	\N	\N
315	zack.png	0	.png	photo	2017-01-01 18:34:15.674+00	2017-01-01 18:34:15.674+00	\N	9	\N	\N	\N	\N	\N
316	levitation.jpg	0	.jpg	photo	2017-01-01 18:35:04.354+00	2017-01-01 18:35:04.354+00	\N	9	\N	\N	\N	\N	\N
317	live.jpg	0	.jpg	photo	2017-01-01 18:35:10.329+00	2017-01-01 18:35:10.329+00	\N	9	\N	\N	\N	\N	\N
318	woods.jpg	0	.jpg	photo	2017-01-01 18:35:26.565+00	2017-01-01 18:35:26.565+00	\N	9	\N	\N	\N	\N	\N
319	recording3.jpg	0	.jpg	photosCoverImage	2017-01-01 18:37:30.425+00	2017-01-01 18:37:30.425+00	\N	10	\N	\N	\N	\N	\N
320	pony.jpg	0	.jpg	photo	2017-01-01 18:38:04.879+00	2017-01-01 18:38:04.879+00	\N	10	\N	\N	\N	\N	\N
321	recording.jpg	0	.jpg	photo	2017-01-01 18:38:40.731+00	2017-01-01 18:38:40.731+00	\N	10	\N	\N	\N	\N	\N
322	promo.png	0	.png	photo	2017-01-01 18:38:48.443+00	2017-01-01 18:38:48.443+00	\N	10	\N	\N	\N	\N	\N
323	promo2.png	0	.png	photo	2017-01-01 18:38:51.01+00	2017-01-01 18:38:51.01+00	\N	10	\N	\N	\N	\N	\N
324	couch.jpg	0	.jpg	photosCoverImage	2017-01-01 18:40:29.227+00	2017-01-01 18:40:29.227+00	\N	11	\N	\N	\N	\N	\N
325	queenave.jpg	0	.jpg	photo	2017-01-01 18:40:39.719+00	2017-01-01 18:40:39.719+00	\N	11	\N	\N	\N	\N	\N
326	riverwestcoop.jpg	0	.jpg	photo	2017-01-01 18:40:46.574+00	2017-01-01 18:40:46.574+00	\N	11	\N	\N	\N	\N	\N
327	tambourine.jpg	0	.jpg	photo	2017-01-01 18:40:53.954+00	2017-01-01 18:40:53.954+00	\N	11	\N	\N	\N	\N	\N
328	american.png	0	.png	photo	2017-01-01 18:41:06.236+00	2017-01-01 18:41:06.236+00	\N	11	\N	\N	\N	\N	\N
329	5.jpg	0	.jpg	photosCoverImage	2017-01-01 18:42:27.693+00	2017-01-01 18:42:27.693+00	\N	12	\N	\N	\N	\N	\N
330	8.jpg	0	.jpg	photo	2017-01-01 18:42:34.605+00	2017-01-01 18:42:34.605+00	\N	12	\N	\N	\N	\N	\N
331	bg.jpg	0	.jpg	photo	2017-01-01 18:42:39.722+00	2017-01-01 18:42:39.722+00	\N	12	\N	\N	\N	\N	\N
332	billy.jpg	0	.jpg	photo	2017-01-01 18:42:43.985+00	2017-01-01 18:42:43.985+00	\N	12	\N	\N	\N	\N	\N
333	2.jpg	0	.jpg	photosCoverImage	2017-01-01 18:43:52.535+00	2017-01-01 18:43:52.535+00	\N	13	\N	\N	\N	\N	\N
334	vows3.jpg	0	.jpg	photo	2017-01-01 18:44:01.353+00	2017-01-01 18:44:01.353+00	\N	13	\N	\N	\N	\N	\N
335	woods.jpg	0	.jpg	photo	2017-01-01 18:44:05.387+00	2017-01-01 18:44:05.387+00	\N	13	\N	\N	\N	\N	\N
336	oldy.jpg	0	.jpg	photo	2017-01-01 18:44:09.135+00	2017-01-01 18:44:09.135+00	\N	13	\N	\N	\N	\N	\N
337	lovesyou.jpg	0	.jpg	photo	2017-01-01 18:44:39.846+00	2017-01-01 18:44:39.846+00	\N	14	\N	\N	\N	\N	\N
338	wonderbitch.jpg	0	.jpg	photo	2017-01-01 18:44:45.776+00	2017-01-01 18:44:45.776+00	\N	14	\N	\N	\N	\N	\N
339	band.jpg	0	.jpg	photosCoverImage	2017-01-01 18:44:53.892+00	2017-01-01 18:44:53.892+00	\N	14	\N	\N	\N	\N	\N
340	3.jpg	0	.jpg	photosCoverImage	2017-01-01 18:45:41.981+00	2017-01-01 18:45:41.981+00	\N	15	\N	\N	\N	\N	\N
341	2.jpg	0	.jpg	photo	2017-01-01 18:45:53.582+00	2017-01-01 18:45:53.582+00	\N	15	\N	\N	\N	\N	\N
342	4.jpg	0	.jpg	photo	2017-01-01 18:45:56.416+00	2017-01-01 18:45:56.416+00	\N	15	\N	\N	\N	\N	\N
343	6.jpg	0	.jpg	photo	2017-01-01 18:45:59.533+00	2017-01-01 18:45:59.533+00	\N	15	\N	\N	\N	\N	\N
344	six.jpg	0	.jpg	photo	2017-01-01 18:46:57.757+00	2017-01-01 18:46:57.757+00	\N	16	\N	\N	\N	\N	\N
345	cassette.jpg	0	.jpg	photosCoverImage	2017-01-01 18:47:07.54+00	2017-01-01 18:47:07.54+00	\N	16	\N	\N	\N	\N	\N
346	phone.jpg	0	.jpg	photosCoverImage	2017-01-01 19:03:25.64+00	2017-01-01 19:03:25.64+00	\N	2	\N	\N	\N	\N	\N
347	drew.jpg	0	.jpg	photo	2017-01-01 19:03:36.915+00	2017-01-01 19:03:36.915+00	\N	2	\N	\N	\N	\N	\N
348	friends.jpg	0	.jpg	photo	2017-01-01 19:03:46.907+00	2017-01-01 19:03:46.907+00	\N	2	\N	\N	\N	\N	\N
349	Bartholin - In Search Of.mp3	0	.mp3	song	2017-01-02 19:36:19.303+00	2017-01-02 19:36:19.303+00	\N	\N	\N	\N	\N	\N	\N
357	Wonderbitch - Beingness.mp3	0	.mp3	song	2017-01-02 23:26:57.571+00	2017-01-02 23:26:57.571+00	\N	14	\N	7	\N	\N	\N
358	Living Hour - This Is The Place.mp3	0	.mp3	song	2017-01-02 23:30:36.164+00	2017-01-02 23:30:36.164+00	\N	8	\N	4	\N	\N	\N
359	!mindparade - Somehow.mp3	0	.mp3	song	2017-01-02 23:33:36.1+00	2017-01-02 23:33:36.1+00	\N	9	\N	6	\N	\N	\N
360	Pony - Waiting For The Day.mp3	0	.mp3	song	2017-01-02 23:34:22.593+00	2017-01-02 23:34:22.593+00	\N	10	\N	5	\N	\N	\N
361	Bartholin - In Search Of.mp3	0	.mp3	song	2017-01-02 23:35:06.593+00	2017-01-02 23:35:06.593+00	\N	2	\N	2	\N	\N	\N
362	Ladycop - Alaska.mp3	0	.mp3	song	2017-01-02 23:35:41.213+00	2017-01-02 23:35:41.213+00	\N	6	\N	3	\N	\N	\N
363	Shorebilly - Shorebilly.mp3	0	.mp3	song	2017-01-02 23:36:28.368+00	2017-01-02 23:36:28.368+00	\N	12	\N	8	\N	\N	\N
364	austinbey2.jpg	0	.jpg	artistTileBack	2017-01-17 00:54:52.247+00	2017-01-17 00:54:52.247+00	\N	1	\N	\N	\N	\N	\N
365	bartholin2.jpg	0	.jpg	artistTileBack	2017-01-17 00:55:06.944+00	2017-01-17 00:55:06.944+00	\N	2	\N	\N	\N	\N	\N
366	blimprock2.jpg	0	.jpg	artistTileBack	2017-01-17 00:55:22.637+00	2017-01-17 00:55:22.637+00	\N	3	\N	\N	\N	\N	\N
367	eazy2.jpg	0	.jpg	artistTileBack	2017-01-17 00:55:42.712+00	2017-01-17 00:55:42.712+00	\N	4	\N	\N	\N	\N	\N
368	jondice2.jpg	0	.jpg	artistTileBack	2017-01-17 00:55:53.305+00	2017-01-17 00:55:53.305+00	\N	5	\N	\N	\N	\N	\N
369	ladycop2.jpg	0	.jpg	artistTileBack	2017-01-17 00:56:02.412+00	2017-01-17 00:56:02.412+00	\N	6	\N	\N	\N	\N	\N
370	livingbody2.jpg	0	.jpg	artistTileBack	2017-01-17 00:56:13.26+00	2017-01-17 00:56:13.26+00	\N	7	\N	\N	\N	\N	\N
371	livinghour2.jpg	0	.jpg	artistTileBack	2017-01-17 00:56:23.998+00	2017-01-17 00:56:23.998+00	\N	8	\N	\N	\N	\N	\N
372	mindparade2.jpg	0	.jpg	artistTileBack	2017-01-17 00:56:45.969+00	2017-01-17 00:56:45.969+00	\N	9	\N	\N	\N	\N	\N
373	pony2.jpg	0	.jpg	artistTileBack	2017-01-17 00:56:57.728+00	2017-01-17 00:56:57.728+00	\N	10	\N	\N	\N	\N	\N
374	thepsychics2.jpg	0	.jpg	artistTileBack	2017-01-17 00:57:33.711+00	2017-01-17 00:57:33.711+00	\N	11	\N	\N	\N	\N	\N
375	shorebilly2.jpg	0	.jpg	artistTileBack	2017-01-17 00:57:45.147+00	2017-01-17 00:57:45.147+00	\N	12	\N	\N	\N	\N	\N
376	vows2.jpg	0	.jpg	artistTileBack	2017-01-17 00:57:55.234+00	2017-01-17 00:57:55.234+00	\N	13	\N	\N	\N	\N	\N
377	wonderbitch2.jpg	0	.jpg	artistTileBack	2017-01-17 00:58:06.789+00	2017-01-17 00:58:06.789+00	\N	14	\N	\N	\N	\N	\N
378	woof2.jpg	0	.jpg	artistTileBack	2017-01-17 00:58:24.275+00	2017-01-17 00:58:24.275+00	\N	15	\N	\N	\N	\N	\N
379	youarenumbersix2.jpg	0	.jpg	artistTileBack	2017-01-17 00:58:42.37+00	2017-01-17 00:58:42.37+00	\N	16	\N	\N	\N	\N	\N
\.


--
-- Name: Files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Files_id_seq"', 379, true);


--
-- Data for Name: MediaMentions; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "MediaMentions" (id, author, date, "linkUrl", title, text, "createdAt", "updatedAt", "AlbumReleaseId", "ArtistId") FROM stdin;
\.


--
-- Name: MediaMentions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"MediaMentions_id_seq"', 1, false);


--
-- Data for Name: MerchItems; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "MerchItems" (id, title, price, "shortDescription", description, sku, qty, format, "isDisplayed", "isFeatured", "createdAt", "updatedAt", "AlbumReleaseId", "ArtistId") FROM stdin;
\.


--
-- Name: MerchItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"MerchItems_id_seq"', 1, false);


--
-- Data for Name: Origins; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Origins" (id, city, "stateProvince", "stateProvinceCode", country, "countryCode", "createdAt", "updatedAt", "ArtistId") FROM stdin;
1	Provo	Utah	\N	USA	US	2016-12-16 23:18:28.028+00	2016-12-16 23:18:28.028+00	2
2		Ontorio	\N	Canada	CA	2016-12-16 23:28:30.922+00	2016-12-16 23:28:30.922+00	3
3		Johannesburg	\N	South Africa	SA	2016-12-16 23:33:26.869+00	2016-12-16 23:33:26.869+00	4
4		Maryland	\N	USA	US	2016-12-16 23:36:49.496+00	2016-12-16 23:36:49.496+00	1
5		Vermont	\N	USA	US	2016-12-16 23:38:07.943+00	2016-12-16 23:38:07.943+00	5
6	Bloomington	Indiana	\N	USA	US	2016-12-16 23:38:45.994+00	2016-12-16 23:38:45.994+00	6
7		Leeds	\N	UK	UK	2016-12-16 23:39:25.744+00	2016-12-16 23:39:25.744+00	7
8		Manitoba	\N	Canada	CA	2016-12-16 23:39:56.986+00	2016-12-16 23:39:56.986+00	8
9		Indiana	\N	USA	US	2016-12-16 23:40:44.416+00	2016-12-16 23:40:44.416+00	9
10		Seoul	\N	Republic of Korea	KR	2016-12-16 23:41:23.522+00	2016-12-16 23:41:23.522+00	10
11		Tennessee	\N	USA	US	2016-12-16 23:41:54.356+00	2016-12-16 23:41:54.356+00	11
12		Paris	\N	France	FR	2016-12-16 23:42:26.446+00	2016-12-16 23:42:26.446+00	12
13		Vermont	\N	USA	US	2016-12-16 23:42:57.588+00	2016-12-16 23:42:57.588+00	13
14		Texas	\N	USA	US	2016-12-16 23:43:25.757+00	2016-12-16 23:43:25.757+00	14
15		New Jersey	\N	USA	US	2016-12-16 23:44:04.762+00	2016-12-16 23:44:04.762+00	15
16			\N	France	FR	2016-12-16 23:45:17.382+00	2016-12-16 23:45:17.382+00	16
17	Bloomington	Indiana	\N	USA	US	2016-12-17 14:53:38.126+00	2016-12-17 14:53:38.126+00	17
\.


--
-- Name: Origins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Origins_id_seq"', 17, true);


--
-- Data for Name: SocialLinkLists; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "SocialLinkLists" (id, "facebookUrl", "twitterUrl", "instagramUrl", "soundcloudUrl", "bandcampUrl", "homepageUrl", "tumblrUrl", "spotifyUrl", "youtubeUrl", "displayFlag", "createdAt", "updatedAt", "ArtistId") FROM stdin;
13	https://www.facebook.com/Vowsmusic	https://twitter.com/VowsMusic	https://www.instagram.com/vowsmusic/	https://soundcloud.com/vowsmusic	\N	http://www.vowsmusic.com/	\N	\N	\N	\N	2016-12-16 23:42:57.592+00	2016-12-18 00:20:03.981+00	13
17	https://www.facebook.com/hypocriteinahippycrypt/			https://soundcloud.com/hypocriteinahippycrypt	https://hypocriteinahippycrypt.bandcamp.com/			https://play.spotify.com/artist/21oMJUQINKIlJqv2vgtdck?play=true&utm_source=open.spotify.com&utm_medium=open		\N	2016-12-17 16:41:14.691+00	2016-12-17 18:01:50.184+00	17
1	https://www.facebook.com/Bartholin-308734082817869/			https://soundcloud.com/ddanburry	\N		\N	https://play.spotify.com/album/4fVqhTLVyLDPztKqizbZYq?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:18:28.037+00	2016-12-17 23:53:36.378+00	2
2	https://www.facebook.com/BlimpRock	https://twitter.com/blimprocklive	https://www.instagram.com/blimprock/	https://soundcloud.com/blimp-rock	https://blimprock.bandcamp.com/	http://www.blimprockenterprises.com/	\N	https://play.spotify.com/album/6mz20mLxJsoxqJQGcFs6PO?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:28:30.928+00	2016-12-17 23:55:03.459+00	3
3	https://www.facebook.com/EazyDAReaLEazy/	https://twitter.com/EazyDAReaLEazy	https://www.instagram.com/eazydarealeazy/	https://soundcloud.com/eazydarealeazy	\N		\N	https://play.spotify.com/album/1lebJzXKpbfgBxHuXDsyio?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:33:26.875+00	2016-12-17 23:56:38.159+00	4
4		https://twitter.com/austnbey	https://www.instagram.com/austnbey/	https://soundcloud.com/austin-bey	\N	http://austinbey.tumblr.com/	\N	https://play.spotify.com/artist/63RenCu134iUbdFSYFqWGp?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:36:49.504+00	2016-12-17 23:57:48.417+00	1
5	https://www.facebook.com/jonaciddice	https://twitter.com/jonaciddice		https://soundcloud.com/jonaciddice	https://jonaciddice.bandcamp.com/		\N	https://open.spotify.com/artist/2De4Jkrgrl4JOPpiZ4TiCl	\N	\N	2016-12-16 23:38:07.949+00	2016-12-18 00:01:38.547+00	5
6	https://www.facebook.com/ldycp		https://www.instagram.com/ldycpmusic	https://soundcloud.com/ldycp	https://ldycp.bandcamp.com/releases		\N	https://open.spotify.com/album/0kKMXRfQUlzHKO0i1qMW9J	\N	\N	2016-12-16 23:38:45.999+00	2016-12-18 00:03:30.71+00	6
7	https://www.facebook.com/livingbodylife	https://twitter.com/livingbodylife	https://www.instagram.com/livingbodylife/	https://soundcloud.com/livingbodylife	https://livingbodylife.bandcamp.com/	http://livingbodylife.com/	\N	https://open.spotify.com/artist/7Di4GL49iHNrKwVjKz0UGq	\N	\N	2016-12-16 23:39:25.751+00	2016-12-18 00:05:23.53+00	7
8	https://www.facebook.com/Livinghourband	https://twitter.com/thehourswpg	https://www.instagram.com/livinghour/	https://soundcloud.com/living-hour	https://thehours.bandcamp.com/	http://www.livinghourband.com/	\N	https://play.spotify.com/artist/2Ho3J07GaGcCl2ePXnjEia?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:39:56.994+00	2016-12-18 00:07:28.422+00	8
9	https://www.facebook.com/mindparade0	https://twitter.com/mindparadeband	https://www.instagram.com/mindparade0/	https://soundcloud.com/mindparade	https://mindparade.bandcamp.com/	http://mindparadeband.tumblr.com/	\N	https://play.spotify.com/artist/2JdfvZkS701JKgFv7A3lGN?play=true&utm_source=open.spotify.com&utm_medium=open	\N	\N	2016-12-16 23:40:44.42+00	2016-12-18 00:08:45.312+00	9
10	https://www.facebook.com/bandthepony			https://soundcloud.com/ponyofficial	\N	http://ponyofficial.tumblr.com/	\N	\N	\N	\N	2016-12-16 23:41:23.525+00	2016-12-18 00:16:04.62+00	10
11	https://www.facebook.com/thepsychics	https://twitter.com/jandthepsychics	https://www.instagram.com/thepsychics/	https://soundcloud.com/the-psychics-1	https://psychicmediafront.bandcamp.com/releases	https://psychicmediafront.com/	\N	https: //open.spotify.com/artist/06rSapMHAH2jrex9AJYgJZ	\N	\N	2016-12-16 23:41:54.361+00	2016-12-18 00:17:30.703+00	11
12	https://www.facebook.com/shorebillyman/	https://twitter.com/shorebillyman/	https://www.instagram.com/remishorebilly/	https://soundcloud.com/shorebilly	\N	http://shorebillymusic.com/	\N	https://open.spotify.com/artist/52pLN8Hb1QxyWAw7IWZzYS	\N	\N	2016-12-16 23:42:26.449+00	2016-12-18 00:18:57.774+00	12
14	https://www.facebook.com/wb.lovesyou	https://twitter.com/_wonderbitch	https://www.instagram.com/_wonderbitch/	https://soundcloud.com/wblovesyou	https://wonderbitch.bandcamp.com/	http://www.wonderbitch.com/	\N	https://open.spotify.com/artist/1T1O5ESmK40eGru1vq5XU0	\N	\N	2016-12-16 23:43:25.76+00	2016-12-18 00:21:16.464+00	14
15	https://www.facebook.com/iamwoof	https://twitter.com/kelanroman	https://www.instagram.com/kelanbonislawski/	https://soundcloud.com/iamwoof	https://woofwoofwoof.bandcamp.com/	http://woofmusic.wix.com/woof	\N	https://open.spotify.com/artist/6FdrTMSbPkC6Ixy7FJ5lZg	\N	\N	2016-12-16 23:44:04.765+00	2016-12-18 00:22:30.188+00	15
16	https://www.facebook.com/youarenumbersixband	https://twitter.com/YAN6music	https://instagram.com/youarenumber6	https://soundcloud.com/you-are-number-six	https://youarenumbersix.bandcamp.com/	http://www.you-are-number-six.com/	\N	https://open.spotify.com/artist/0wM6JJJCdHrz5e37GaaSpI	\N	\N	2016-12-16 23:45:17.388+00	2016-12-18 00:24:45.784+00	16
\.


--
-- Name: SocialLinkLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"SocialLinkLists_id_seq"', 17, true);


--
-- Data for Name: Songs; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Songs" (id, title, "fileName", "createdAt", "updatedAt", "AlbumReleaseId", "ArtistId") FROM stdin;
2	In Search Of	Bartholin - In Search Of.mp3	2017-01-02 20:31:36.732+00	2017-01-02 20:31:36.732+00	28	\N
3	Alaska	Ladycop - Alaska.mp3	2017-01-02 20:46:52.023+00	2017-01-02 20:46:52.023+00	29	\N
4	This Is The Place	Living Hour - This Is The Place.mp3	2017-01-02 20:48:11.132+00	2017-01-02 20:48:11.132+00	19	\N
5	Waiting For The Day	Pony - Waiting For The Day.mp3	2017-01-02 20:49:37.131+00	2017-01-02 20:49:37.131+00	22	\N
6	Somehow	!mindparade - Somehow.mp3	2017-01-02 20:51:59.192+00	2017-01-02 20:51:59.192+00	21	\N
7	Beingness	Wonderbitch - Beingness.mp3	2017-01-02 20:52:57.69+00	2017-01-02 20:52:57.69+00	17	\N
8	Shorebilly	Shorebilly - Shorebilly.mp3	2017-01-02 20:53:45.63+00	2017-01-02 20:53:45.63+00	32	\N
\.


--
-- Name: Songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Songs_id_seq"', 8, true);


--
-- Data for Name: UserMessages; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "UserMessages" (id, status, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- Name: UserMessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"UserMessages_id_seq"', 1, false);


--
-- Data for Name: UserNotifications; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "UserNotifications" (id, type, status, "fromId", "fromName", "fromUsername", "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- Name: UserNotifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"UserNotifications_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "Users" (id, email, username, dob, password, "firstName", "lastName", bio, "homepageLink", "facebookLink", "twitterLink", "instagramLink", "soundcloudLink", "siteAdmin", artist, subscriber, "createdAt", "updatedAt", "ArtistId", "UserId") FROM stdin;
4	zanselm5@gmail.com	zdizzle6717	\N	$2a$10$MOTxCWL8vM5b.NFJBIhOPOL0xVsyY.oRan.vBL/VwwY7pB2ZLyK7G	\N	\N	\N	\N	\N	\N	\N	\N	f	f	t	2016-12-31 20:27:33.628+00	2016-12-31 20:27:33.628+00	\N	\N
7	treemachinerecords@gmail.com	treemachine	\N	$2a$10$Kw6qc/P2b2faFhHoO6Nnpu.B0IP0yAWBZcaEcD959f4.Ele93fJIy	\N	\N	\N	\N	\N	\N	\N	\N	t	f	f	2017-01-01 20:17:44.078+00	2017-01-01 20:17:44.078+00	\N	\N
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tmadmin
--

SELECT pg_catalog.setval('"Users_id_seq"', 7, true);


--
-- Data for Name: userHasFriends; Type: TABLE DATA; Schema: public; Owner: tmadmin
--

COPY "userHasFriends" ("createdAt", "updatedAt", "UserId", "FriendId") FROM stdin;
\.


--
-- Name: AlbumReleases_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AlbumReleases"
    ADD CONSTRAINT "AlbumReleases_pkey" PRIMARY KEY (id);


--
-- Name: Artists_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Artists"
    ADD CONSTRAINT "Artists_pkey" PRIMARY KEY (id);


--
-- Name: BioSections_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "BioSections"
    ADD CONSTRAINT "BioSections_pkey" PRIMARY KEY (id);


--
-- Name: ContactLists_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "ContactLists"
    ADD CONSTRAINT "ContactLists_pkey" PRIMARY KEY (id);


--
-- Name: EmbeddableMedia_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "EmbeddableMedia"
    ADD CONSTRAINT "EmbeddableMedia_pkey" PRIMARY KEY (id);


--
-- Name: FeaturedAlbumLists_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "FeaturedAlbumLists"
    ADD CONSTRAINT "FeaturedAlbumLists_pkey" PRIMARY KEY (id);


--
-- Name: FeaturedSongLists_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "FeaturedSongLists"
    ADD CONSTRAINT "FeaturedSongLists_pkey" PRIMARY KEY (id);


--
-- Name: Files_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_pkey" PRIMARY KEY (id);


--
-- Name: MediaMentions_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MediaMentions"
    ADD CONSTRAINT "MediaMentions_pkey" PRIMARY KEY (id);


--
-- Name: MerchItems_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MerchItems"
    ADD CONSTRAINT "MerchItems_pkey" PRIMARY KEY (id);


--
-- Name: Origins_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Origins"
    ADD CONSTRAINT "Origins_pkey" PRIMARY KEY (id);


--
-- Name: SocialLinkLists_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "SocialLinkLists"
    ADD CONSTRAINT "SocialLinkLists_pkey" PRIMARY KEY (id);


--
-- Name: Songs_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Songs"
    ADD CONSTRAINT "Songs_pkey" PRIMARY KEY (id);


--
-- Name: UserMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserMessages"
    ADD CONSTRAINT "UserMessages_pkey" PRIMARY KEY (id);


--
-- Name: UserNotifications_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserNotifications"
    ADD CONSTRAINT "UserNotifications_pkey" PRIMARY KEY (id);


--
-- Name: Users_email_key; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users_username_key; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: userHasFriends_pkey; Type: CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "userHasFriends"
    ADD CONSTRAINT "userHasFriends_pkey" PRIMARY KEY ("UserId", "FriendId");


--
-- Name: AlbumReleases_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "AlbumReleases"
    ADD CONSTRAINT "AlbumReleases_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BioSections_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "BioSections"
    ADD CONSTRAINT "BioSections_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ContactLists_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "ContactLists"
    ADD CONSTRAINT "ContactLists_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EmbeddableMedia_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "EmbeddableMedia"
    ADD CONSTRAINT "EmbeddableMedia_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Files_AlbumReleaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_AlbumReleaseId_fkey" FOREIGN KEY ("AlbumReleaseId") REFERENCES "AlbumReleases"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Files_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Files_MerchItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_MerchItemId_fkey" FOREIGN KEY ("MerchItemId") REFERENCES "MerchItems"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Files_SongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_SongId_fkey" FOREIGN KEY ("SongId") REFERENCES "Songs"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Files_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Files"
    ADD CONSTRAINT "Files_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MediaMentions_AlbumReleaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MediaMentions"
    ADD CONSTRAINT "MediaMentions_AlbumReleaseId_fkey" FOREIGN KEY ("AlbumReleaseId") REFERENCES "AlbumReleases"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MediaMentions_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MediaMentions"
    ADD CONSTRAINT "MediaMentions_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MerchItems_AlbumReleaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MerchItems"
    ADD CONSTRAINT "MerchItems_AlbumReleaseId_fkey" FOREIGN KEY ("AlbumReleaseId") REFERENCES "AlbumReleases"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MerchItems_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "MerchItems"
    ADD CONSTRAINT "MerchItems_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Origins_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Origins"
    ADD CONSTRAINT "Origins_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SocialLinkLists_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "SocialLinkLists"
    ADD CONSTRAINT "SocialLinkLists_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Songs_AlbumReleaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Songs"
    ADD CONSTRAINT "Songs_AlbumReleaseId_fkey" FOREIGN KEY ("AlbumReleaseId") REFERENCES "AlbumReleases"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Songs_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Songs"
    ADD CONSTRAINT "Songs_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserMessages_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserMessages"
    ADD CONSTRAINT "UserMessages_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserNotifications_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "UserNotifications"
    ADD CONSTRAINT "UserNotifications_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Users_ArtistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_ArtistId_fkey" FOREIGN KEY ("ArtistId") REFERENCES "Artists"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Users_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: userHasFriends_FriendId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "userHasFriends"
    ADD CONSTRAINT "userHasFriends_FriendId_fkey" FOREIGN KEY ("FriendId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userHasFriends_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tmadmin
--

ALTER TABLE ONLY "userHasFriends"
    ADD CONSTRAINT "userHasFriends_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

