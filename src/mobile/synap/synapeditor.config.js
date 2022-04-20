var synapEditorConfig = {
    "editor.license": "/mobile/synap/license.json",
    /**
     * 에디터에서 사용할 기본 스타일을 설정합니다.
     * 예제의 Element들의 속성만 지정이 가능하며, cssText 형태로 작성
     * ex) 'Body', Paragraph', 'TextRun', 'Div', 'Image', 'Video', 'List', 'ListItem'
           'Quote', 'Table', 'TableRow', 'TableCell', 'HorizontalLine', 'Iframe',
           'Heading1', 'Heading2', Heading3', Heading4', Heading5', Heading6'
     */
    'editor.defaultStyle': {
        'Body': 'font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.2;',
        'Iframe': "-webkit-touch-select:none; -ms-user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);",
        'TextRun':'line-height:0 !important;'
    },
    'editor.size.width': '100%',
    'editor.size.height': '100%',
    /**
     * 사용자 정의 문단, 글꼴 서식 스타일을 설정합니다.
     * paragraph: 문단 서식 스타일
     * textRun: 글꼴 서식 스타일
     */
    'editor.customStyle': {
        'paragraph': [{
            'name': 'Dark Gray',
            'style': {
                'color': { 'r': 98, 'g': 98, 'b': 98 }
            }
        }, {
            'name': 'Light Gray',
            'style': {
                'color': { 'r': 220, 'g': 220, 'b': 220 }
            }
        }],
        'textRun': [{
            'name': 'Mint 32 Bold',
            'style': {
                'bold': true,
                'fontSize': {
                    'value': 32,
                    'unit': 'pt'
                },
                'color': { 'r': 57, 'g': 182, 'b': 184 }
            }
        }, {
            'name': 'Orange 24 Bold',
            'style': {
                'bold': true,
                'fontSize': {
                    'value': 24,
                    'unit': 'pt'
                },
                'color': { 'r': 243, 'g': 151, 'b': 0 }
            }
        }]
    },
    /**
     * htmlBuild시 옵션을 설정합니다.
     */
    'editor.buildOption.html': {
        'peelOffDiv': false,
        'alertDuplicateId': true,
        'checkPreWrap': false
    },
    'editor.menu.show': false,
    /**
    * 에디터 툴바 버튼(드롭다운)의 크기를 설정합니다.
    * 최소값은 22 입니다. (단위 px)
    */
    'editor.ui.button.size': null,
    /**
    * 에디터 툴바 버튼(드롭다운)의 아이콘 크기를 설정합니다.
    * 최소값은 16 입니다. (단위 px)
    */
    'editor.ui.button.icon.size': null,
    'editor.contentFilter.allowScript': false,
    /**
     * 모바일용 툴바를 설정합니다.
     */
    'editor.mobile.toolbar': {
        'main': [
            'fullScreen', 'paragraphStyle', 'fontSize',
            'bold', 'italic', 'underline', 'strike',
            'simpleFontColor', 'simpleFontBackgroundColor'
        ],
        'text': [],
        'table': [],
        'img': [],
        'div': [],
        'video': []
    },
    'editor.toolbar': {
        'main': [
            'fullScreen', 'paragraphStyle', 'fontSize',
            'bold', 'italic', 'underline', 'strike',
            'simpleFontColor', 'simpleFontBackgroundColor'
        ],
        'text': [],
        'img': [],
        'div': [],
        'video': []
    },
};

