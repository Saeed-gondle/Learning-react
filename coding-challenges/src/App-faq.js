import React, { useState } from 'react';
import './app-faq.css';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {

  
  return (
    <div>
      <h2 className="accordion-title">Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <AccordionItem
                key={index}
                title={faq.title}
                text={faq.text}
                num={index}
          />
        ))}
      </div>
    </div>
  );
}
function AccordionItem({ title, text, num }) {
    const toggleAccordion = e => {
      setIsOpen(isOpen => !isOpen);
    };
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>

      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
