const formatstring = `
DO NOT MAKE TEXT BOLD
Mood:Lazy
Album: sample album
Artist:  Sample Artist
BPM:sample BPM



`
//Data that had been used for the LLM answers training, not in usage anymore
// const formatstring = `**Mood: Lazy**

// * Album: Pet Sounds
// * Artist: The Beach Boys
// * BPM: 100

// * Album: Kind of Blue
// * Artist: Miles Davis
// * BPM: 60

// * Album: Moon Safari
// * Artist: Air
// * BPM: 80

// * Album: The Low End Theory
// * Artist: A Tribe Called Quest
// * BPM: 70

// * Album: The Dark Side of the Moon
// * Artist: Pink Floyd
// * BPM: 70

// **Mood: Reflective**

// * Album: Rumours
// * Artist: Fleetwood Mac
// * BPM: 90

// * Album: OK Computer
// * Artist: Radiohead
// * BPM: 110

// * Album: What's Going On
// * Artist: Marvin Gaye
// * BPM: 85

// * Album: The Stranger
// * Artist: Billy Joel
// * BPM: 90

// * Album: Wish You Were Here
// * Artist: Pink Floyd
// * BPM: 65

// **Mood: Smooth**

// * Album: Kind of Blue
// * Artist: Miles Davis
// * BPM: 60

// * Album: At Last!
// * Artist: Etta James
// * BPM: 100

// * Album: Come Away with Me
// * Artist: Norah Jones
// * BPM: 70

// * Album: Frank Sinatra Sings for Only the Lonely
// * Artist: Frank Sinatra
// * BPM: 80

// * Album: My Favorite Things
// * Artist: John Coltrane
// * BPM: 70

// **Mood: Groovy**

// * Album: Off the Wall
// * Artist: Michael Jackson
// * BPM: 120

// * Album: Thriller
// * Artist: Michael Jackson
// * BPM: 120

// * Sticky Fingers
// * Artist: The Rolling Stones
// * BPM: 140

// * Hotel California
// * Artist: Eagles
// * BPM: 75

// * Rumours
// * Artist: Fleetwood Mac
// * BPM: 90

// **Mood: Energized**

// * Bad
// * Artist: Michael Jackson
// * BPM: 110

// * Thriller
// * Artist: Michael Jackson
// * BPM: 120

// * Born to Run
// * Artist: Bruce Springsteen
// * BPM: 130

// * Raising Hell
// * Artist: Run-D.M.C.
// * BPM: 130

// * A Day at the Races
// * Artist: Queen
// * BPM: 100

// **Mood: Intense**

// * The Wall
// * Artist: Pink Floyd
// * BPM: 140

// * Ride the Lightning
// * Artist: Metallica
// * BPM: 150

// * Master of Puppets
// * Artist: Metallica
// * BPM: 150

// * Led Zeppelin IV
// * Artist: Led Zeppelin
// * BPM: 110

// * Dark Fantasy
// * Artist: Kanye West
// * BPM: 120

// **Mood: Epic**

// * In the Court of the Crimson King
// * Artist: King Crimson
// * BPM: 110

// * The Joshua Tree
// * Artist: U2
// * BPM: 95

// * Sgt. Pepper's Lonely Hearts Club Band
// * Artist: The Beatles
// * BPM: 120

// * The Rise and Fall of Ziggy Stardust
// * Artist: David Bowie
// * BPM: 95

// * A Night at the Opera
// * Artist: Queen
// * BPM: 100`

module.exports = { formatstring }