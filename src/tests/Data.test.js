const { _saveQuestion, _saveQuestionAnswer } = require("../utils/_DATA");

describe("_saveQuestion", () => {
  it("should return true with all correct parameters", async () => {
    const optionOneText = "More team outings";
    const optionTwoText = "Days of service";
    const optionOneImage = "https://i.imgur.com/aBYze1Z.png";
    const optionTwoImage = "https://i.imgur.com/OfKpkVr.png";
    const author = "aaronb";

   const res = await _saveQuestion(
      {optionOneText, 
       optionTwoText, 
       optionOneImage,
       optionTwoImage,
       author,
      }
    );

    expect(res).toBeTruthy();
  });

  it("should display error if optionOneText is invalid", async () => {
    const optionOneText = undefined;
    const optionTwoText = "Days of service";
    const optionOneImage = "https://i.imgur.com/aBYze1Z.png";
    const optionTwoImage = "https://i.imgur.com/OfKpkVr.png";
    const author = "aaronb";

    const res = await _saveQuestion(
        {optionOneText, 
         optionTwoText, 
         optionOneImage,
         optionTwoImage,
         author,
        }
      ).catch(e => e);

    expect(res).toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should display error if optionTwoText is invalid", async () => {
    const optionOneText = "More team outings";
    const optionTwoText = undefined;
    const optionOneImage = "https://i.imgur.com/aBYze1Z.png";
    const optionTwoImage = "https://i.imgur.com/OfKpkVr.png";
    const author = "aaronb";

    const res = await _saveQuestion(
        {optionOneText, 
         optionTwoText, 
         optionOneImage,
         optionTwoImage,         
         author,
        }
      ).catch(e => e);

    expect(res).toBe("Please provide optionOneText, optionTwoText, and author");
  });

  it("should display error if author is invalid", async () => {
    const optionOneText = "More team outings";
    const optionTwoText = "Days of service";
    const optionOneImage = "https://i.imgur.com/aBYze1Z.png";
    const optionTwoImage = "https://i.imgur.com/OfKpkVr.png";
    const author = undefined;

    const res = await _saveQuestion(
        {optionOneText, 
         optionTwoText, 
         optionOneImage,
         optionTwoImage,            
         author,
        }
      ).catch(e => e);

    expect(res).toBe("Please provide optionOneText, optionTwoText, and author");
  });
})

describe("_saveQuestionAnswer", () => {
  it("should return true with all correct parameters", async () => {
    const user = "aaronb";
    const id = "vthrdm985a262al8qx3do";
    const ans = "optionOne";

   const res = await _saveQuestionAnswer(
      {authedUser: user, 
       qid: id, 
       answer: ans,
      }
    );

    expect(res).toBeTruthy();
  });

  it("should display error if authedUser is invalid", async () => {
    const user = undefined;
    const id = "vthrdm985a262al8qx3do";
    const ans = "optionOne";

   const res = await _saveQuestionAnswer(
      {authedUser: user, 
       qid: id, 
       answer: ans,
      }
    ).catch(e => e);

    expect(res).toBe("Please provide authedUser, qid, and answer");
  });

  it("should display error if qid is invalid", async () => {
    const user = "aaronb";
    const id = undefined;
    const ans = "optionOne";

   const res = await _saveQuestionAnswer(
      {authedUser: user, 
       qid: id, 
       answer: ans,
      }
    ).catch(e => e);

    expect(res).toBe("Please provide authedUser, qid, and answer");
  });

  it("should display error if ans is invalid", async () => {
    const user = "aaronb";
    const id = "vthrdm985a262al8qx3do";
    const ans = undefined;

   const res = await _saveQuestionAnswer(
      {authedUser: user, 
       qid: id, 
       answer: ans,
      }
    ).catch(e => e);

    expect(res).toBe("Please provide authedUser, qid, and answer");
  });
})