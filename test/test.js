const assert = require('assert')

const Parser = require('../Parser.js')

describe('Parser', () => {
  describe('parseAudioString', () => {
    const audioParser = new Parser

    it('should parse audio string type(with song info) and return appropriate hash', () => {
      const songArray = [
        "{19681100}[19681002]_{68}()[1](1)_WITH A LITTLE HELP FROM MY FRIENDS  [BY BEATLES]_JOE COCKER.mp3",
        "{19681102}[]_{5}()[]()_WHO'S MAKING LOVE  [BY DON DAVIS, FOR ALL]_JOHNNIE TAYLOR.mp3",
        "{19681102}[]_{4}()[]()_ABRAHAM, MARTIN AND JOHN  [FOR LINCOLN, KING & KENNEDY]_DION (& BELMONTS).mp3",
        "{19681123}[]_{8}()[]()_BOTH SIDES NOW  [BY JONI MITCHELL]_JUDY COLLINS.mp3"
      ]
      const expectationArray = [
        ['19681100', '19681002', '68', '', '1', '1', 'WITH A LITTLE HELP FROM MY FRIENDS', 'BY BEATLES', 'JOE COCKER'],
        ['19681102', '', '5', '', '', '', "WHO'S MAKING LOVE", 'BY DON DAVIS, FOR ALL', 'JOHNNIE TAYLOR'],
        ['19681102', '', '4', '', '', '', 'ABRAHAM, MARTIN AND JOHN', 'FOR LINCOLN, KING & KENNEDY', 'DION (& BELMONTS)'],
        ['19681123', '', '8', '', '', '', 'BOTH SIDES NOW', 'BY JONI MITCHELL', 'JUDY COLLINS']
      ]

      songArray.forEach((audioString, index) => {
        const parsedStringHash = audioParser.parseAudioString(audioString)
        const testArray = expectationArray[index]

        assert.equal(parsedStringHash.usChartDate, testArray[0])
        assert.equal(parsedStringHash.ukChartDate, testArray[1])

        assert.equal(parsedStringHash.usPeakPosition, testArray[2])
        assert.equal(parsedStringHash.usPeakNumOfWeeks, testArray[3])

        assert.equal(parsedStringHash.ukPeakPosition, testArray[4])
        assert.equal(parsedStringHash.ukPeakNumOfWeeks, testArray[5])

        assert.equal(parsedStringHash.name, testArray[6])
        assert.equal(parsedStringHash.information, testArray[7])
        assert.equal(parsedStringHash.artist, testArray[8])
      })
    })

    it('should parse audio string type(without song info) and return appropriate hash', () => {
      const songArray = [
        "{}[19681106]_{}()[5]()_I'M THE URBAN SPACEMAN_BONZO DOG DOO DAH BAND.mp3",
        "{}[19681106]_{}()[1](4)_LILY THE PINK_SCAFFOLD.mp3",
        "{}[19681106]_{}()[9]()_I'M A TIGER_LULU.mp3",
        "{}[19681120]_{}()[4]()_1-2-3 O'LEARY_DES O'CONNOR.mp3",
        "{}[19681120]_{}()[8]()_PRIVATE NUMBER_JUDY CLAY & WILLIAM BELL.mp3",
        "{}[19681120]_{}()[8]()_RACE WITH THE DEVIL_GUN.mp3",
        "{}[19681127]_{}()[6]()_SABRE DANCE (LOVE)_LOVE SCULPTURE (FEAT DAVE EDMUNDS).mp3",
        "{19681109}[]_{2}(2)[]()_FOR ONCE IN MY LIFE_STEVIE WONDER.mp3",
        "{19681116}[]_{3}()[]()_WICHITA LINEMAN_GLEN CAMPBELL.mp3",
        "{19681116}[]_{5}()[]()_STORMY_CLASSICS IV FEAT DENNIS YOST.mp3",
        "{19681116}[]_{9}()[]()_I LOVE HOW YOU LOVE ME_BOBBY VINTON.mp3",
        "{19681123}[]_{1}(7)[1](3)_I HEARD IT THROUGH THE GRAPEVINE_MARVIN GAYE.mp3",
        "{19681123}[]_{6}()[]()_CLOUD NINE_TEMPTATIONS.mp3",
        "{19681123}[]_{31}()[5]()_LES BICYCLETTES DE BELSIZE_ENGELBERT HUMPERDINCK.mp3"
      ]

      const expectationArray = [
        ['', '19681106', '', '', '5', '', "I'M THE URBAN SPACEMAN", "BONZO DOG DOO DAH BAND"],
        ['', '19681106', '', '', '1', '4', "LILY THE PINK", 'SCAFFOLD'],
        ['', '19681106', '', '', '9', '', "I'M A TIGER", 'LULU'],
        ['', '19681120', '', '', '4', '', "1-2-3 O'LEARY", "DES O'CONNOR"],
        ['', '19681120', '', '', '8', '', "PRIVATE NUMBER", "JUDY CLAY & WILLIAM BELL"],
        ['', '19681120', '', '', '8', '', "RACE WITH THE DEVIL", 'GUN'],
        ['', '19681127', '', '', '6', '', "SABRE DANCE (LOVE)", "LOVE SCULPTURE (FEAT DAVE EDMUNDS)"],
        ['19681109', '', '2', '2', '', '', "FOR ONCE IN MY LIFE", 'STEVIE WONDER'],
        ['19681116', '', '3', '', '', '', "WICHITA LINEMAN", 'GLEN CAMPBELL'],
        ['19681116', '', '5', '', '', '', "STORMY", "CLASSICS IV FEAT DENNIS YOST"],
        ['19681116', '', '9', '', '', '', "I LOVE HOW YOU LOVE ME", "BOBBY VINTON"],
        ['19681123', '', '1', '7', '1', '3', "I HEARD IT THROUGH THE GRAPEVINE", "MARVIN GAYE"],
        ['19681123', '', '6', '', '', '', "CLOUD NINE", 'TEMPTATIONS'],
        ['19681123', '', '31', '', '5', '', "LES BICYCLETTES DE BELSIZE", 'ENGELBERT HUMPERDINCK']
      ]

      songArray.forEach((audioString, index) => {
        const parsedStringHash = audioParser.parseAudioString(audioString)
        const testArray = expectationArray[index]

        assert.equal(parsedStringHash.usChartDate, testArray[0])
        assert.equal(parsedStringHash.ukChartDate, testArray[1])

        assert.equal(parsedStringHash.usPeakPosition, testArray[2])
        assert.equal(parsedStringHash.usPeakNumOfWeeks, testArray[3])

        assert.equal(parsedStringHash.ukPeakPosition, testArray[4])
        assert.equal(parsedStringHash.ukPeakNumOfWeeks, testArray[5])

        assert.equal(parsedStringHash.name, testArray[6])
        assert.equal(parsedStringHash.artist, testArray[7])
      })
    })

    it('should return empty hash if inappropriate string', () => {
      var parsedStringHash = audioParser.parseAudioString('sfsafkndsafa.mp3')
      assert.deepEqual(parsedStringHash, {})
      parsedStringHash = audioParser.parseAudioString(
        "{}[]_{}[]()_test_test [aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaend]"
      )
      assert.deepEqual(parsedStringHash, {})
    })
  })
})
