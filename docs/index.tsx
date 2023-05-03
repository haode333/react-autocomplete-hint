import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Hint } from '../src';
import './index.scss';

const Demo: React.FC = () => {
    const [text, setText] = useState('');
    const options = ['Papaya', 'Persimmon', 'Pea', 'Pear', 'Peach', 'Apples', 'Apricots', 'Avocados'];

    return (
        <div className='demo'>
            <p>
                Try typing any of the words in the list below:
            </p>
            <code>
                ["Papaya", "Persimmon", "Pea", "Pear", "Peach", "Apples", "Apricots", "Avocados"]
            </code>
            <div className='input-wrapper'>
                <Hint options={options} allowTabFill continuousHint hintColor='red' onHint={(vals) => console.log(`onHint: ${JSON.stringify(vals)}`)} onFill={(val) => console.log(`onFill: ${val}`)}>
                    <input
                        className='input-with-hint'
                        value={text}
                        onChange={e => setText(e.target.value)} />
                </Hint>
            </div>
            <p>
                Github Repo: <a href="https://github.com/haode333/react-autocomplete-hint">https://github.com/haode333/react-autocomplete-hint</a>
            </p>
        </div>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(<Demo />);