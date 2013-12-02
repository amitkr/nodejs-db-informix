{
  'targets': [
    {
        'target_name': 'informix_bindings'
      , 'variables': {
          'informixdir': '<!(echo ${INFORMIXDIR:-/opt/informix})'
      }
      , 'sources': [
              'lib/nodejs-db/binding.cxx'
            , 'lib/nodejs-db/connection.cxx'
            , 'lib/nodejs-db/events.cxx'
            , 'lib/nodejs-db/exception.cxx'
            , 'lib/nodejs-db/query.cxx'
            , 'lib/nodejs-db/result.cxx'
            , 'src/connection.cxx'
            , 'src/informix.cxx'
            , 'src/result.cxx'
            , 'src/query.cxx'
            , 'src/informix_bindings.cxx'
      ]
      , 'include_dirs': [
          '<@(informixdir)/incl'
        , '<@(informixdir)/incl/dmi'
        , '<@(informixdir)/incl/esql'
        , '<@(informixdir)/incl/c++'
        , 'lib'
      ]
      , 'defines': [
          'LINUX'
        , 'IT_HAS_DISTINCT_LONG_DOUBLE'
        , 'IT_COMPILER_HAS_LONG_LONG'
        , 'IT_DLLIB'
        , 'MITRACE_OFF'
        # , 'DEBUG'
      ]
      , 'cflags': [
          '-Wall'
        # , '-g'
        , '-O2'
        , '-fsigned-char'
      ]
      , 'cflags_cc': [
          '-fexceptions'
        , '-std=c++11'
      ]
      , 'ldflags': [
          '-Wl,--no-as-needed'
        , '-lpthread'
        , '-lm'
        , '-ldl'
        , '-lcrypt'
        , '-lnsl'
        , '-lifgls'
        , '-lifglx'
        , '-lthsql'
        , '-lthasf'
        , '-lthgen'
        , '-lthos'
        , '-lthc++'
        , '-lthdmi'
        # , '-lgls'
        # , '-lglx'
        # , '-lifsql'
        # , '-lifasf'
        # , '-lifgen'
        # , '-lifos'
        # , '-lifc++'
        # , '-lifdmi'
        , '<@(informixdir)/lib/esql/checkapi.o'
      ]
      , 'libraries': [
          '-L<@(informixdir)/lib'
        , '-L<@(informixdir)/lib/esql'
        , '-L<@(informixdir)/lib/dmi'
        , '-L<@(informixdir)/lib/c++'
      ]
      , 'conditions': [
          ['OS=="win"'
          , {
            # no Windows support yet...
          }
          , {
            'libraries': []
          }]
        , ['OS=="mac"'
          , {
            # no Mac support yet...
            'xcode_settings': {
              'OTHER_CFLAGS': []
            }
          }
        , {
          'cflags': []
        }]
      ]
    }
  ]
}
