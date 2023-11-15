const blessing = [
  "ขอให้มีความสุข ไม่ติด F และได้ A ในทุกๆ วิชาที่เรียน",
  "ขอให้โชคดีในทุกๆ ด้าน ทั้งด้านการงาน การเงิน ความรัก สุขภาพ และครอบครัว",
  "ขอให้มีความสุข สมหวังในสิ่งที่ปรารถนา ไม่ว่าจะเรื่องเล็กหรือเรื่องใหญ่",
  "ขอให้ประสบความสำเร็จในทุกๆ ย่างก้าว ก้าวข้ามอุปสรรคไปได้เสมอ",
  "ขอให้มีแต่คนรักและเอ็นดู เป็นที่รักของทุกคน",
  "ขอให้มีสุขภาพแข็งแรงทั้งกายและใจ ไร้โรคภัยเบียดเบียน",
  "ขอให้มีความสุขสงบ ปราศจากทุกข์โศก พบแต่สิ่งดีงามในชีวิต",
];

let blessingIndex = 0;

const randomBlessing = () => {
  if (blessingIndex === blessing.length - 1) {
    blessingIndex = 0;
  }

  const result = blessing[blessingIndex];
  blessingIndex += 1;

  return result;
};

export { blessing, randomBlessing };
