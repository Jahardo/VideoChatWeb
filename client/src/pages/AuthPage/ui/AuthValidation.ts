import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const emailValidation = (email:string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);

export enum passwordSafeGradient {
    GREEN = 'green',
    YELLOW = 'yellow',
    RED = 'red',
    DEFAULT = 'default'
}

interface passwordSafeStyleProto {
    borderColor:string,
}
export const passwordSafeStyles: Record<passwordSafeGradient, passwordSafeStyleProto> = {
    [passwordSafeGradient.RED]: { borderColor: 'red' },
    [passwordSafeGradient.GREEN]: { borderColor: 'green' },
    [passwordSafeGradient.YELLOW]: { borderColor: 'yellow' },
    [passwordSafeGradient.DEFAULT]: { borderColor: 'var(--bg-color)' },
};

/*
export const scorePassword = (pas:string) => {
    const oneCapital:boolean = /[A-Z]/.test(pas);
    const oneNumber:boolean = /\d/.test(pas);
    const enoughCharacter = pas.length > 8;
    if (!enoughCharacter) {
        return passwordSafeStyles.red;
    }
    if (enoughCharacter && oneCapital && oneNumber) {
        return passwordSafeStyles.green;
    }
    return passwordSafeStyles.yellow;
};
*/
