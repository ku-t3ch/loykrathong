const hasBadWord = (text: string): boolean => {
  const badWords = [
    "มึง",
    "กู",
    "ควย",
    "ปี้",
    "เหี้ย",
    "สัด",
    "เย็ด",
    "หี",
    "แม่ง",
    "แตด",
    "เงี่ยน",
    "กะหรี่",
    "เหี้ย",
    "อีเวร",
    "หน้าด้าน",
    "ชาติชั่ว",
    "ถ่อย",
    "หัวควย",
    "โง่",
  ];
  return badWords.some((word) => text.includes(word));
};

export default hasBadWord;
