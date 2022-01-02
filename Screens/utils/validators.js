export const VALID_NAME_REGEX = new RegExp(
    "^\\w+$",
    "i"
);

export const VALID_USERNAME_REGEX = new RegExp(
    "^\\w{3,}$",
    "i"
);

export const VALID_EMAIL_REGEX = new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
    "i"
);

export const VALID_PASSWORD_REGEX = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
    "i"
);