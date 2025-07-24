const widget = new ListWidget();

const stack = widget.addStack();
stack.layoutHorizontally();

const stackLeft = stack.addStack();
stackLeft.layoutVertically();

const daysOfWeek = {
  0:    {full: "日曜日", char: "日", rom: "Nichiyoubi"},
  1:    {full: "月曜日", char: "月", rom: "Getsuyoubi"},
  2:   {full: "火曜日", char: "火", rom: "Kayoubi"},
  3: {full: "水曜日", char: "水", rom: "Suiyoubi"},
  4:  {full: "木曜日", char: "木", rom: "Mokuyoubi"},
  5:    {full: "金曜日", char: "金", rom: "Kinyoubi"},
  6:  {full: "土曜日", char: "土", rom: "Doyoubi"}
};

const now = new Date();
const today = now.getDay();
const todayInfo = daysOfWeek[today];

const stackKanji = stackLeft.addStack();
stackKanji.layoutHorizontally();
stackKanji.addSpacer();
const full = stackKanji.addText(todayInfo.full);
full.font = new Font("Hiragino Sans",15);
full.textColor = Color.white();
stackKanji.addSpacer();

stackLeft.addSpacer(10);

const stackChar = stackLeft.addStack();
stackChar.layoutHorizontally();
stackChar.addSpacer();
const char = stackChar.addText(todayInfo.char);
char.font = new Font("Hiragino Mincho ProN",70);
char.textColor = Color.yellow();
stackChar.addSpacer();

stackLeft.addSpacer(10);

const stackRomanji = stackLeft.addStack();
stackRomanji.layoutHorizontally();
stackRomanji.addSpacer();
const romanji = stackRomanji.addText(todayInfo.rom);
romanji.font = new Font("Hiragino Sans",15);
romanji.textColor = Color.white();
stackRomanji.addSpacer();

stack.addSpacer(10);

const stackRight = stack.addStack();
stackRight.layoutVertically();

const key = "YOUR_API_KEY";

async function getProfile() {
  let req = new Request("https://eu.renshuu.org/api/v1/profile");
  req.headers = {"Authorization": `Bearer ${key}`};
  try {
    const data = await req.loadJSON();
    console.log(data);
    return data;
  } catch (e) {
    	console.log("Error loading profile, ", e);
  }  
}

let data = await getProfile();
const level = stackRight.addText("Level: " + data.adventure_level);
level.font = new Font("Hiragino Sans",15);
level.textColor = Color.white();
stackRight.addSpacer(10);

if (data.studied.today_all == 0) {
  const practicedToday = stackRight.addText("You have not practiced today!");
  practicedToday.font = new Font("Hiragino Sans",15);
  practicedToday.textColor = Color.red();
  stackRight.addSpacer(10);
  
  const kaoReq = new Request(data.kao);
  const kao = await kaoReq.loadImage();
  stackRight.addImage(kao);
}
else {
  const practicedToday = stackRight.addText("You have practiced today!");
  practicedToday.font = new Font("Hiragino Sans",15);
  practicedToday.textColor = Color.green();
  stackRight.addSpacer(10);
  
  const stackStats = stackRight.addStack();
  stackStats.layoutHorizontally();
  
  const kanji = stackStats.addStack();
  kanji.layoutVertically();
  const kanjiTitle = kanji.addText("Kanji");
  kanjiTitle.font = new Font("Hiragino Sans",13);
  kanjiTitle.textColor = Color.white();
  
  kanji.addSpacer(5);
  
  const todayKanji = kanji.addText(data.studied.today_kanji.toString());
  todayKanji.font = new Font("Hiragino Sans",20);
  todayKanji.textColor = Color.white();
  
  stackStats.addSpacer(5);
  
  const vocab = stackStats.addStack();
  vocab.layoutVertically();
  const vocabTitle = vocab.addText("Vocab");
  vocabTitle.font = new Font("Hiragino Sans",13);
  vocabTitle.textColor = Color.white();
  
  vocab.addSpacer(5);

  const todayVocab = vocab.addText(data.studied.today_vocab.toString());
  todayVocab.font = new Font("Hiragino Sans",20);
  todayVocab.textColor = Color.white();
  
  stackStats.addSpacer(5);
  
  const grammar = stackStats.addStack();
  grammar.layoutVertically();
  const grammarTitle = grammar.addText("Grammar");
  grammarTitle.font = new Font("Hiragino Sans",13);
  grammarTitle.textColor = Color.white();

  grammar.addSpacer(5);

  const todayGrammar = grammar.addText(data.studied.today_grammar.toString());
  todayGrammar.font = new Font("Hiragino Sans",20);
  todayGrammar.textColor = Color.white();
  
  stackStats.addSpacer(5);
}

widget.backgroundColor = Color.black();

Script.setWidget(widget);
Script.complete;

widget.presentMedium();
