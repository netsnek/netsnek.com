const smtPageDirectoryComponent = {
    section: {
        title: {
            // Section titles are text on the white body. theme.500 is the same
            // #f77f00 as brand.500 and was 2.63:1 there, the token is 4.60:1.
            // The dark half keeps theme.600.
            color: {
                default: 'shared.text.brand',
                _dark: 'theme.600'
            }
        }
    }
}

export default smtPageDirectoryComponent;