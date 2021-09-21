import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EmojiPicker } from './EmojiPicker';
import { Streami18n } from '../i18n/Streami18n';
import { EmojiData, I18n } from 'emoji-mart';
import { Data as EmojiDataSet } from 'emoji-mart/dist-es/utils/data';
import { TranslationContextValue, TranslationProvider } from '../context/TranslationContext';

interface SupportedNimblePickerProps {
  data: EmojiDataSet;
  emoji: string;
  i18n: I18n;
  onSelect: (emoji: EmojiData) => void;
  title: string;
}

jest.mock(
  'emoji-mart/dist/components/picker/nimble-picker.js',
  // eslint-disable-next-line react/display-name
  () => ({ i18n }: SupportedNimblePickerProps) => {
    return (
      <div>
        emoji-picker-props
        <div>{JSON.stringify(i18n).replace(/\\"/g, '"')}</div>
      </div>
    );
  },
);

describe('EmojiPicker', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<EmojiPicker />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-emoji-picker"
      >
        <div
          className="raf-emoji-picker__button"
          onClick={[Function]}
          role="button"
        >
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
              fill="#A0B2B8"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('open and closes the emoji picker correctly', () => {
    const { container, getByRole, queryByTestId } = render(<EmojiPicker />);

    expect(queryByTestId('picker-wrapper')).not.toBeInTheDocument();

    fireEvent.click(getByRole('button'));
    expect(queryByTestId('picker-wrapper')).toBeInTheDocument();

    fireEvent.mouseDown(container);
    expect(queryByTestId('picker-wrapper')).not.toBeInTheDocument();
  });

  it('provides default i18n strings in english to underlying emoji picker component', () => {
    const { getByRole, container } = render(<EmojiPicker />);
    fireEvent.click(getByRole('button'));
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-emoji-picker"
      >
        <div
          class="raf-emoji-picker__container"
          data-testid="picker-wrapper"
        >
          <div>
            emoji-picker-props
            <div>
              {"search":"Search","clear":"Clear","notfound":"No emoji found","skintext":"Choose your default skin tone","categorieslabel":"Emoji categories","categories":{"search":"Search Results","recent":"Frequently Used","people":"Smileys & Emotion","nature":"Animals & Nature","foods":"Food & Drink","activity":"Activity","places":"Travel & Places","objects":"Objects","symbols":"Symbols","flags":"Flags","custom":"Custom"}}
            </div>
          </div>
        </div>
        <div
          class="raf-emoji-picker__button"
          role="button"
        >
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
              fill="#A0B2B8"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('displays default i18n strings in other language than default english - spanish', async () => {
    const translator = await getTranslator('es');
    const { getByRole, container } = render(
      <TranslationProvider value={translator}>
        <EmojiPicker />
      </TranslationProvider>,
    );
    fireEvent.click(getByRole('button'));
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-emoji-picker"
      >
        <div
          class="raf-emoji-picker__container"
          data-testid="picker-wrapper"
        >
          <div>
            emoji-picker-props
            <div>
              {"search":"Buscar","clear":"Claro","notfound":"No se ha encontrado ningún emoji","skintext":"Elige tu tono de piel por defecto","categorieslabel":"Categorías de emoji","categories":{"search":"Resultados de la búsqueda","recent":"Usado frecuentemente","people":"Sonrisas y emociones","nature":"Animales y naturaleza","foods":"Alimentación y Bebidas","activity":"Actividad","places":"Viajes y lugares","objects":"Objetos","symbols":"Símbolos","flags":"Banderas","custom":"Personalizado"}}
            </div>
          </div>
        </div>
        <div
          class="raf-emoji-picker__button"
          role="button"
        >
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
              fill="#A0B2B8"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('displays custom i18n strings', () => {
    const { getByRole, container } = render(
      <EmojiPicker
        i18n={{
          search: 'Custom Searchh',
          // @ts-expect-error
          clear: 'Custom Clear',
          skintext: 'Custom Skintext',
          categories: { recent: 'Custom Recent' },
        }}
      />,
    );
    fireEvent.click(getByRole('button'));
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-emoji-picker"
      >
        <div
          class="raf-emoji-picker__container"
          data-testid="picker-wrapper"
        >
          <div>
            emoji-picker-props
            <div>
              {"search":"Custom Searchh","clear":"Custom Clear","skintext":"Custom Skintext","categories":{"recent":"Custom Recent"}}
            </div>
          </div>
        </div>
        <div
          class="raf-emoji-picker__button"
          role="button"
        >
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
              fill="#A0B2B8"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </div>
    `);
  });
});

async function getTranslator(language: string): Promise<TranslationContextValue> {
  return await new Streami18n({ language }).getTranslators();
}
