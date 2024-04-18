const dfMessenger = document.querySelector( 'df-messenger' );
if( dfMessenger )
{
    dfMessenger.addEventListener( 'df-messenger-loaded', function( event )
    {
        // CUSTOMIZE THE MAIN BUTTON
            $( '<button>', { class: 'dfmessenger', title: this.getAttribute( 'chat-title' ) } ).append( '<span class="material-icons">support_agent</span>' ).insertBefore( $( '...query for selecting the element before which the new button must be placed...' ) );
            $( '.dfmessenger' ).click( function( event )
            {
                event.preventDefault();
                $( '.dfmessenger .material-icons' ).text( dfMessenger.shadowRoot.getElementById( 'df-chat-wrapper' ).shadowRoot.querySelector( '.chat-wrapper.chat-open' ) ? 'support_agent' : 'south_east' );
                $( dfMessenger.shadowRoot.getElementById( 'widgetIcon' ) ).trigger( 'click' );
                return false;
            } );
            $( this.shadowRoot ).find( '#widgetIcon' ).hide();

        // CUSTOMIZE THE DIALOGUE WINDOW
            $( this.shadowRoot.getElementById( 'df-chat-wrapper' ).shadowRoot ).prepend( $( '<style>' ).text( '.chat-wrapper { ...your !important style rules... } .chat-wrapper.chat-closed { display: none; /* with this rule, the opening animation will be lost, but the ghost element that intercepts and blocks clicks to any underlying elements near the button will also disappear. */ } df-message-list { ...your !important style rules... } @media screen and ( max-width: 500px ) { .chat-wrapper.chat-open { ...your !important style rules... } }' ) );

        new MutationObserver( function()
        {
            var dialog = dfMessenger.shadowRoot.getElementById( 'df-chat-wrapper' ).shadowRoot.querySelector( '.chat-wrapper.chat-open' );
            if( dialog )
            {
                // CUSTOMIZE THE MESSAGE AREA ( AVAILABLE ONLY WHEN THE CHAT OPENS )
                    var list = dialog.querySelector( 'df-message-list' ).shadowRoot;
                    if( !$( list ).find( '> style' ).length )
                        $( list ).prepend( $( '<style>' ).text( '#messageList .message { ...your !important style rules... }' ) );

                // CUSTOMIZE THE INPUT AREA ( AVAILABLE ONLY WHEN THE CHAT OPENS )
                    var input = dialog.querySelector( 'df-messenger-user-input' ).shadowRoot;
                    if( !$( input ).find( '> style' ).length )
                        $( input ).prepend( $( '<style>' ).text( '.input-box-wrapper { ...your !important style rules... } #sendIcon:hover { fill: ...your !important color...; }' ) );

                var moList = new MutationObserver( function()
                {   // CUSTOMIZE SUGGESTIONS ( AVAILABLE ONLY DURING THE CONVERSATION ) 
                    $( list.getElementById( 'messageList' ).querySelectorAll( 'df-chips' ) ).each( function()
                    {
                        if( !$( this.shadowRoot ).find( '> style' ).length )
                            $( this.shadowRoot ).prepend( $( '<style>' ).text( '.df-chips-wrapper .chip { ...your !important style rules... } .df-chips-wrapper .chip:hover { ...your !important style rules... } .df-chips-wrapper a, button { ...your !important style rules... } .df-chips-wrapper .chip:hover button { ...your !important style rules... }' ) );
                    } );
                } ).observe( list, { childList: true, characterData: false, attributes: false, subtree: true } );
            }
        } ).observe( dfMessenger.shadowRoot.getElementById( 'df-chat-wrapper' ).shadowRoot, { childList: true, characterData: false, attributes: false, subtree: true } );
    } );
}