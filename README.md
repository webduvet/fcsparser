# fcsparser
parser for fcs 3.0 files

# How it works
HeaderParser requires file descriptor with fcs file
output is an array representing the header of FCS file
containing basic data about text, data and analysis segments
and in aditions checks for other segments if present

Header parser contains the updateHeader method taking text segment and header to update
as arguments, returns referenvce to updateted header

TextSegment Class requires Header object and file descriptor
to instantiate the text segment object.
text segment object has interface to read the text segment values.

DataFatory creates the factory instance with Text Segment instance, file descriptor and header array
has factory method parseColor returning the object representing single color, containing reference
to binary buffer and necessary meta data to read the binary Buffer.

Color class creates the view object of color data oject with interface to
read the data.
