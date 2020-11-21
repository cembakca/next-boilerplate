/* eslint-disable import/no-extraneous-dependencies  */
const CompressImages = require('compress-images');
const rimraf = require('rimraf');
const path = require('path');
const mv = require('mv');

const basePath = 'static/img/';
const inputFilesRegexSelector = 'static/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
const outputPath = 'static/img-compressed/';

const compressImagesToTempDirectory = () => {
  return new Promise((resolve, reject) => {
    try {
      CompressImages(
        inputFilesRegexSelector,
        outputPath,
        { compress_force: false, statistic: false, autoupdate: true },
        true,
        { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
        { png: { engine: 'pngquant', command: ['--quality=30-50 --skip-if-larger --floyd=0.5'] } },
        { svg: { engine: 'svgo', command: '--multipass' } },
        { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
        (error, completed, statistic) => {
          if (error) {
            console.error('  -> Error compressing image: ', error);
          } else {
            console.warn('  -> ', statistic || 'Already existed file');
          }
          if (completed) {
            resolve(true);
          }
        },
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

const moveAny = (source, target) => {
  return new Promise((resolve, reject) => {
    mv(
      path.join(path.resolve(__dirname), source),
      path.join(path.resolve(__dirname), target),
      { mkdirp: true },
      (err) => {
        if (err) {
          reject(new Error(`Error has occurred while renaming folder ${source}: ${err}`));
        } else {
          resolve(`Folder moved: ${outputPath} to ${basePath}`);
        }
      },
    );
  });
};

const removeFolder = (relativePathToRemove) => {
  const fullPathToRemove = path.join(path.resolve(__dirname), relativePathToRemove);
  return new Promise((resolve, reject) => {
    rimraf(
      fullPathToRemove,
      {
        maxBusyTries: 3,
        emfileWait: 1000,
        glob: { nosort: true, silent: true },
        disableGlob: false,
      },
      (err) => {
        if (err) {
          reject(new Error(`Error has occurred while removing folder => ${fullPathToRemove}`));
        } else {
          resolve(`Folder removed => ${fullPathToRemove}`);
        }
      },
    );
  });
};

const run = async () => {
  try {
    console.warn('\n\t> Removing target folder if exists');
    await removeFolder(`../../${outputPath}`);

    console.warn('\n\t> Compression Started');
    await compressImagesToTempDirectory();
    console.warn('\n\t> Compression Finished');

    console.warn('\n\t> Removing source folder');
    await removeFolder(`../../${basePath}`);

    console.warn('\n\t> Moving target folder to base path');
    await moveAny(`../../${outputPath}`, `../../${basePath}`);

    console.warn('\n\t> All operations have done.');
  } catch (err) {
    console.error('ERR: ', err);
  }
};

run().then((r) => r);
