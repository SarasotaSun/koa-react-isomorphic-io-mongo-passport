# React-Isomorphic-IO-Mongo-Passport
React , React-Router, Socket IO, Mongo &amp; Passport

###An upgrade of: Alex Bank's "Building a Polling App with Socket IO and React.js" (Lynda.com)

## Run the project in development:
* `$ npm run build`
* `$ npm run dev`

###Note:

In react-router 1.0.0 RC-1, to successfully pass state to child routes, I did the follow:

1. Clone element with children:

       renderChild = () =>
        
           React.cloneElement(this.props.children, {
             emit: this.emit.bind(this),
             ...this.state
           });

2. Pass that to the child routes:
       
        { React.Children
          .map(this.props.children, this.renderChild) }       
