const lang = "nb";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
const collatorFactory = (
  locale = lang,
  {
    usage = "search",
    caseFirst = "lower",
    numeric = true,
    sensitivity = "base"
  } = {}
) =>
  new Intl.Collator(lang, {
    ignorePunctuation: true,
    caseFirst,
    usage,
    numeric,
    sensitivity
  });

// const searchcollator = collatorFactory(lang, {
//   usage: "search",
//   sensitivity: "base"
// });
// var s = "congres";
// var a = ["Congrès", "congres", "Assemblée", "poisson"];
// var matches = a.filter(v => searchcollator.compare(v, s) === 0);
// console.log(matches);
// console.log(searchcollator.resolvedOptions());

const { compare } = collatorFactory();

export { compare };
