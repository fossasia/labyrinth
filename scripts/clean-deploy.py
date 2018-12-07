from path import Path
from itertools import chain
import os

# get all files
d = Path('./');

# text files
config       = d.walkfiles(".*");
md           = d.walkfiles("*.md");
licensefiles = d.walkfiles("*.license");

# concat all lists
files = chain(md, config, licensefiles);

# delete them
for file in files:
	print("Deleting :" + file);
	file.remove()

# compress media files
mp3 = d.walkfiles("*.mp3");
m4a = d.walkfiles("*.m4a");
wav = d.walkfiles("*.wav");

# concat all lists
allmedia = chain(mp3, m4a, wav);

# compress
for media in allmedia:
	directory 	= os.path.dirname(media);
	file 		= os.path.basename(media);
	os.system("ffmpeg -i "+media+" -map 0:a:0 -b:a 96k -y "+directory+"/"+file);
	print("Compressing : " + media );

print("Script by Yash Kumar Verma");
