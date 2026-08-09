import ScrollContainer from "@/components/scrollcontainer";
import Card from "@/components/card";

interface Item {
  image: string;
  href: string;
  title: string | { [key: string]: string };
  date: string;
  description?: string | { [key: string]: string };
}

interface Props {
  title: string;
  items: Item[];
  lang: 'ja' | 'en';
}

export default function Portfolio({ title, items, lang }: Props) {
  const titleClassName="text-2xl font-bold tracking-wider text-slate-700 dark:text-slate-200 text-center w-full";
  const cardWrapperStyle = "shrink-0 snap-start snap-always w-[85vw] sm:w-[360px]";
  const getLocalizedText = (textObj?: string | { [key: string]: string }) => {
    if (!textObj) return undefined;
    if (typeof textObj === 'string') return textObj;
    return textObj[lang] || textObj.ja;
  };

  return (
    <div className="flex flex-col mb-16 gap-6 w-full">
      <h2 className={titleClassName}>{title}</h2>
      <ScrollContainer>
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className={cardWrapperStyle}>
            <Card
              image={item.image}
              href={item.href}
              title={getLocalizedText(item.title) || ''}
              date={new Date(item.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              description={getLocalizedText(item.description)}
            />
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
}