import { ClassNames } from './ClassNames';

describe('ClassNames', () => {
    test('test with only parameter', () => {
        expect(ClassNames('flex', {}, []))
            .toBe('flex');
    });
    test('test with additional parameters', () => {
        expect(ClassNames(
            'flex',
            {},
            ['flex1', 'flex2'],
        ))
            .toBe('flex flex1 flex2');
    });
    test('test with mods parameters', () => {
        const expected = 'flex hovered scroll';
        expect(ClassNames(
            'flex',
            { hovered: true, scroll: true, focus: false },
            [],
        ))
            .toBe(expected);
    });
    test('test with mods undefined  parameters', () => {
        const expected = 'flex hovered scroll';
        expect(ClassNames(
            'flex',
            { hovered: true, scroll: true, focus: undefined },
            [],
        ))
            .toBe(expected);
    });
});
