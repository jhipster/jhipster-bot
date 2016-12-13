'use strict';

angular.module('angularPassportApp')
  .factory('Constants', function () {
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

    const AUTHENTICATION_TYPE_QUESTION = 'Which *type* of authentication would you like to use?';
    const AUTHENTICATION_TYPE_CHOICES = [
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

    const LIB_SASS_QUESTION = 'Would you like to use the LibSass stylesheet preprocessor for your CSS?';
    const LIB_SASS_CHOICES = [
        {name: 'Yes', value: true},
        {name: 'No', value: false}
    ];

    const LANGUAGE_QUESTION = 'Would you like to enable internationalization support?';
    const NATIVE_LANGUAGE_QUESTION = 'Please choose native language of your app';
    const ADDITIONAL_LANGUAGE_QUESTION = 'Please choose additional languages to install';
    const LANGUAGE_CHOICES = [
        {name: 'Catalan', value: 'ca'},
        {name: 'Chinese (Simplified)', value: 'zh-cn'},
        {name: 'Chinese (Traditional)', value: 'zh-tw'},
        {name: 'Czech', value: 'cs'},
        {name: 'Danish', value: 'da'},
        {name: 'Dutch', value: 'nl'},
        {name: 'English', value: 'en'},
        {name: 'Estonian', value: 'et'},
        {name: 'French', value: 'fr'},
        {name: 'Galician', value: 'gl'},
        {name: 'German', value: 'de'},
        {name: 'Greek', value: 'el'},
        {name: 'Hindi', value: 'hi'},
        {name: 'Hungarian', value: 'hu'},
        {name: 'Italian', value: 'it'},
        {name: 'Japanese', value: 'ja'},
        {name: 'Korean', value: 'ko'},
        {name: 'Marathi', value: 'mr'},
        {name: 'Polish', value: 'pl'},
        {name: 'Portuguese (Brazilian)', value: 'pt-br'},
        {name: 'Portuguese', value: 'pt-pt'},
        {name: 'Romanian', value: 'ro'},
        {name: 'Russian', value: 'ru'},
        {name: 'Slovak', value: 'sk'},
        {name: 'Serbian', value: 'sr'},
        {name: 'Spanish', value: 'es'},
        {name: 'Swedish', value: 'sv'},
        {name: 'Turkish', value: 'tr'},
        {name: 'Tamil', value: 'ta'},
        {name: 'Vietnamese', value: 'vi'}
    ];

    const YES_NO_CHOICES = [
        {name: 'Yes', value: true},
        {name: 'No', value: false}
    ];

    const constants = {
        APP_PACKAGE_QUESTION:           APP_PACKAGE_QUESTION,
        APP_NAME_QUESTION:              APP_NAME_QUESTION,
        APP_TYPE_QUESTION:              APP_TYPE_QUESTION,
        APP_TYPE_CHOICES:               APP_TYPE_CHOICES,
        AUTHENTICATION_TYPE_QUESTION:   AUTHENTICATION_TYPE_QUESTION,
        AUTHENTICATION_TYPE_CHOICES:    AUTHENTICATION_TYPE_CHOICES,
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
        TEST_CHOICES:                   TEST_CHOICES,
        LIB_SASS_QUESTION:              LIB_SASS_QUESTION,
        LIB_SASS_CHOICES:               LIB_SASS_CHOICES,
        LANGUAGE_QUESTION:              LANGUAGE_QUESTION,
        NATIVE_LANGUAGE_QUESTION:       NATIVE_LANGUAGE_QUESTION,
        ADDITIONAL_LANGUAGE_QUESTION:   ADDITIONAL_LANGUAGE_QUESTION,
        LANGUAGE_CHOICES:               LANGUAGE_CHOICES,
        YES_NO_CHOICES:                 YES_NO_CHOICES

    };

    return constants;
  });