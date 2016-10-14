'use strict';


const APP_NAME_QUESTION = 'What is the name of your JHipster application?';

const APP_PACKAGE_QUESTION = 'What is the name of your JHipster package?';

const APP_TYPE_QUESTION = 'Which *type* of application would you like to create?';

const APP_TYPE_CHOICES = [
    {
        value: 'monolith',
        name: 'Monolithic application (recommended for simple projects)'
    },
    {
        value: 'microservice',
        name: 'Microservice application'
    },
    {
        value: 'gateway',
        name: 'Microservice gateway'
    },
    {
        value: 'uaa',
        name: '[BETA] JHipster UAA server (for microservice OAuth2 authentication)'
    }
];

const AUTHENTIFICATION_TYPE_QUESTION = 'Which *type* of authentication would you like to use?';
const AUTHENTIFICATION_TYPE_CHOICES = [
    {
      value: 'session',
      name: 'HTTP Session Authentication (stateful, default Spring Security mechanism)'
    },
    {
      value: 'oauth2',
      name: 'OAuth2 Authentication (stateless, with an OAuth2 server implementation)'
    },
    {
      value: 'jwt',
      name: 'JWT authentication (stateless, with a token)'
    }
];

const PROD_DATABASE_QUESTION = 'Which *type* of database would you like to use?';
const PROD_DATABASE_CHOICES = [
    {
      value: 'sql',
      name: 'SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle)'
    },
    {
      value: 'mongodb',
      name: 'MongoDB'
    },
    {
      value: 'cassandra',
      name: 'Cassandra'
    }
];

const PROD_SQL_DATABASE_QUESTION = 'Which *production* database would you like to use?';
const PROD_SQL_DATABASE_CHOICES = [
    {
        value: 'mysql',
        name: 'MySQL'
    },
    {
        value: 'mariadb',
        name: 'MariaDB'
    },
    {
        value: 'postgresql',
        name: 'PostgreSQL'
    },
    {
        value: 'oracle',
        name: 'Oracle - Warning! The Oracle JDBC driver (ojdbc) is not bundled because it is not Open Source. Please follow our documentation to install it manually.'
    }
];

const DEV_DATABASE_QUESTION = 'Which *development* database would you like to use?';
const DEV_DATABASE_CHOICES = [
     {
         value: 'h2Disk',
         name: 'H2 with disk-based persistence'
     },
     {
         value: 'h2Memory',
         name: 'H2 with in-memory persistence'
     }
 ];

const MYSQL_DATABASE_CHOICES = {
     value: 'mysql',
     name: 'MySQL'
 };

 const MARIADB_DATABASE_CHOICES = {
  value: 'mariadb',
  name: 'MariaDB'
};

const POSTGRESQL_DATABASE_CHOICES = {
  value: 'postgresql',
  name: 'PostgreSQL'
};


const ORACLE_DATABASE_CHOICES = {
  value: 'oracle',
  name: 'Oracle 12c'
};

const BUILD_TOOL_QUESTION = 'Would you like to use Maven or Gradle for building the backend?';
const BUILD_TOOL_CHOICES = [
   {
       value: 'maven',
       name: 'Maven'
   },
   {
       value: 'gradle',
       name: 'Gradle'
   }
];

const HIBERNATE_CACHE_QUESTION = 'Do you want to use Hibernate 2nd level cache?';
const HIBERNATE_CACHE_CHOICES = [
    {
        value: 'no',
        name: 'No'
    },
    {
        value: 'ehcache',
        name: 'Yes, with ehcache (local cache, for a single node)'
    },
    {
        value: 'hazelcast',
        name: 'Yes, with HazelCast (distributed cache, for multiple nodes)'
    }
];

const TEST_QUESTION = 'Which testing frameworks would you like to use?';

const TEST_CHOICES = [
    {name: 'Gatling', value: 'gatling'},
    {name: 'Cucumber', value: 'cucumber'},
    {name: 'Protractor', value: 'protractor'}
];

const constants = {
    APP_PACKAGE_QUESTION:           APP_PACKAGE_QUESTION,
    APP_NAME_QUESTION:              APP_NAME_QUESTION,
    APP_TYPE_QUESTION:              APP_TYPE_QUESTION,
    APP_TYPE_CHOICES:               APP_TYPE_CHOICES,
    AUTHENTIFICATION_TYPE_QUESTION: AUTHENTIFICATION_TYPE_QUESTION,
    AUTHENTIFICATION_TYPE_CHOICES:  AUTHENTIFICATION_TYPE_CHOICES,
    PROD_DATABASE_QUESTION:         PROD_DATABASE_QUESTION,
    PROD_DATABASE_CHOICES:          PROD_DATABASE_CHOICES,
    PROD_SQL_DATABASE_QUESTION:     PROD_SQL_DATABASE_QUESTION,
    PROD_SQL_DATABASE_CHOICES:      PROD_SQL_DATABASE_CHOICES,
    DEV_DATABASE_QUESTION:          DEV_DATABASE_QUESTION,
    DEV_DATABASE_CHOICES:           DEV_DATABASE_CHOICES,
    ORACLE_DATABASE_CHOICES:        ORACLE_DATABASE_CHOICES,
    MYSQL_DATABASE_CHOICES:         MYSQL_DATABASE_CHOICES,
    MARIADB_DATABASE_CHOICES:       MARIADB_DATABASE_CHOICES,
    POSTGRESQL_DATABASE_CHOICES:    POSTGRESQL_DATABASE_CHOICES,
    HIBERNATE_CACHE_CHOICES:        HIBERNATE_CACHE_CHOICES,
    HIBERNATE_CACHE_QUESTION:       HIBERNATE_CACHE_QUESTION,
    BUILD_TOOL_QUESTION:            BUILD_TOOL_QUESTION,
    BUILD_TOOL_CHOICES:             BUILD_TOOL_CHOICES,
    TEST_QUESTION:                  TEST_QUESTION,
    TEST_CHOICES:                   TEST_CHOICES

};

module.exports = constants;
