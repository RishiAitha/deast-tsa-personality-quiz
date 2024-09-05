const calculateMatches = (userProfile, events) => {
    return events
      .map(event => {
        let score = 0;
        for (let i = 0; i < userProfile.length; i++) {
          if (i === 9 && userProfile[i] === 0 && event.variables[i] === 1) {
            return null;
          }
          score += Math.pow(userProfile[i] - event.variables[i], 2);
        }
        return event ? { ...event, score: Math.sqrt(score) } : null;
      })
      .filter(event => event !== null)
      .sort((a, b) => a.score - b.score);
  };
  
  export default calculateMatches;
  