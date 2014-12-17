#SplitTest 

The SplitTest class allows testing different versions of Bliss by randomly assigning the current user to a test group.

For example:

    @example
    var background_color = new SplitTest('background-color-test').values('red', 'blue', 'purple');

background_color will have a 1/3 chance of being red, a 1/3 chance of being blue, and a 1/3 chance of being purple.  Differences in the performance of the different conditions can then be identified.

Once a SplitTest value is assigned to a user it is saved to Storage, so that that SplitTest will always return the same value for the user.
The SplitTest also saves data to Parse.com for tracking purposes.


Another example:

    @example
    var force_registration = new SplitTest('force-registration').truefalse();


The first time this code runs - it will assign a value to the test 'force-registration' of either true or false. In the future, it will simply retrieve this


NOTE: User must be loaded before SplitTests can be created.

