function _0x5c1c(_0x45d6ba,_0x503929){const _0x3aa9f0=_0x3aa9();return _0x5c1c=function(_0x5c1c06,_0x3f0aae){_0x5c1c06=_0x5c1c06-0x179;let _0x9e6cd=_0x3aa9f0[_0x5c1c06];return _0x9e6cd;},_0x5c1c(_0x45d6ba,_0x503929);}const _0xc8ee46=_0x5c1c;(function(_0x4700fc,_0xe2475c){const _0x13f175=_0x5c1c,_0x385ea9=_0x4700fc();while(!![]){try{const _0x2eb966=-parseInt(_0x13f175(0x18a))/0x1+parseInt(_0x13f175(0x188))/0x2*(-parseInt(_0x13f175(0x18d))/0x3)+parseInt(_0x13f175(0x17c))/0x4+-parseInt(_0x13f175(0x17e))/0x5+-parseInt(_0x13f175(0x196))/0x6+parseInt(_0x13f175(0x184))/0x7+-parseInt(_0x13f175(0x191))/0x8*(-parseInt(_0x13f175(0x192))/0x9);if(_0x2eb966===_0xe2475c)break;else _0x385ea9['push'](_0x385ea9['shift']());}catch(_0x4d52cc){_0x385ea9['push'](_0x385ea9['shift']());}}}(_0x3aa9,0xb2060));function _0x3aa9(){const _0x554b7a=['UPDATE\x20users\x20SET\x20activate\x20=\x20true\x20WHERE\x20link\x20=\x20\x27','931335pOarTH','\x27\x20WHERE\x20resetCode\x20=\x20\x27','SELECT\x20*\x20FROM\x20users\x20WHERE\x20email\x20=\x20\x22','SELECT\x20resetCode\x20FROM\x20users\x20WHERE\x20email\x20=\x20\x22','createPool','\x27\x20AND\x20resetCode\x20=\x20\x27','527583mUzEqE','UPDATE\x20users\x20SET\x20','exports','\x27\x20AND\x20email\x20=\x20\x27','2Khjtbh','INSERT\x20INTO\x20users\x20(email,\x20password,\x20id,\x20link\x20,\x20activate\x20,\x20resetCode)\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20VALUES\x20(\x27','642315uGZgJc','\x27,\x20\x27','\x27\x20,\x20\x27false\x27\x20,\x20\x27','2193522xqUEKK','\x27\x20WHERE\x20email\x20=\x20\x27','\x22\x20AND\x20password\x20=\x20\x22','md5','872bqwlWp','154314awTYGQ','mysql2','\x20=\x20\x27','../../data/config','6011022YYCVkX','UPDATE\x20users\x20SET\x20resetCode\x20=\x20\x27','query','promise','5385976HviTMs'];_0x3aa9=function(){return _0x554b7a;};return _0x3aa9();}const mysql=require(_0xc8ee46(0x193)),config=require(_0xc8ee46(0x195)),md5=require(_0xc8ee46(0x190)),connection=mysql[_0xc8ee46(0x182)](config['db'])[_0xc8ee46(0x17b)](),uuid=require('uuid')['v4'],userModule={'register':async(_0x5deeb6,_0x5d653b,_0x3be009)=>connection['query'](_0xc8ee46(0x189)+_0x5deeb6+'\x27,\x20\x27'+md5(_0x5d653b)+'\x27\x20,\x20\x27'+_0x3be009+_0xc8ee46(0x18b)+uuid()+_0xc8ee46(0x18c)+uuid()+'\x27)'),'login':async(_0x5534af,_0x510f82)=>connection[_0xc8ee46(0x17a)](_0xc8ee46(0x180)+_0x5534af+_0xc8ee46(0x18f)+md5(_0x510f82)+'\x22'),'changeLog':async(_0x45bda6,_0x480b50,_0x1de477,_0x518164)=>connection[_0xc8ee46(0x17a)](_0xc8ee46(0x185)+_0x1de477+_0xc8ee46(0x194)+_0x518164+_0xc8ee46(0x18e)+_0x45bda6+_0xc8ee46(0x183)+_0x480b50+'\x27'),'confirmEmail':async _0x1cf631=>connection['query'](_0xc8ee46(0x17d)+_0x1cf631+'\x27'),'updateCode':async(_0x5f3002,_0x4ac676,_0x21c0a6)=>connection[_0xc8ee46(0x17a)](_0xc8ee46(0x179)+_0x21c0a6+_0xc8ee46(0x17f)+_0x4ac676+_0xc8ee46(0x187)+_0x5f3002+'\x27'),'getLink':async _0x18015d=>connection[_0xc8ee46(0x17a)]('SELECT\x20link\x20FROM\x20users\x20WHERE\x20email\x20=\x20\x22'+_0x18015d+'\x22'),'findOne':async _0x3027d0=>connection[_0xc8ee46(0x17a)]('SELECT\x20count(*)\x20FROM\x20users\x20WHERE\x20email\x20=\x20\x22'+_0x3027d0+'\x22'),'getCode':async _0x775f9a=>connection[_0xc8ee46(0x17a)](_0xc8ee46(0x181)+_0x775f9a+'\x22')};module[_0xc8ee46(0x186)]=userModule;