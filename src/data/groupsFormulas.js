export default {
    lims: {
      label: 'lims',
      data: [
          '\\lim\\limits_{x \\to \\infty } f(x)',
          '\\lim\\limits_{x \\to 0 } f(x)',
          '\\lim\\limits_{\\substack{x \\to 0 \\\\ y \\to 0}} f(x, y)',
      ]
    },

    integrals: {
        label: 'integrals',
        data: [
            '\\int f(x)dx',
            '\\iint f(x)dx',
            '\\iiint f(x)dx',
            '\\int_a^b f(x)dx',
            '\\iint\\limits_D f(x, y)dD',
            '\\iiint\\limits_D f(x, y, z)dD',
            '\\oint f(x)dx',
            '\\oiint f(x)dx',
            '\\oiiint f(x)dx',
        ]
    },

    sums: {
        label: 'sums',
        data: [
            '\\sum a_i',
            '\\sum_{i=1}^n a_i',
            '\\sum\\limits_{i=1}^n a_i',
        ]
    },

    matrices: {
        label: 'matrices',
        data: [
            '\\begin{bmatrix}\n' +
            '1 & 2 \\\\\n' +
            'a & b \n' +
            '\\end{bmatrix}',

            '\\begin{pmatrix}\n' +
            '1 & 2\\\\\n' +
            'a & b\n' +
            '\\end{pmatrix}',

            '\\begin{Bmatrix}\n' +
            '1 & 2\\\\\n' +
            'a & b\n' +
            '\\end{Bmatrix}',

            '\\begin{vmatrix}\n' +
            '1 & 2\\\\\n' +
            'a & b\n' +
            '\\end{vmatrix}',

            '\\begin{Vmatrix}\n' +
            '1 & 2\\\\\n' +
            'a & b\n' +
            '\\end{Vmatrix}',

            '\\begin{matrix}\n' +
            '1 & 2\\\\\n' +
            'a & b\n' +
            '\\end{matrix}'
        ]
    },

    staples: {
        label: 'staples',
        data: [
            '\\left[ \\right]',
            '\\left( \\right)',
            '\\left\\{ \\right\\}'
        ]
    }
}
