import path from 'node:path'

//to run node js ffmpeg commands
import ffmpeg from 'fluent-ffmpeg'

//gives binary path of ffmpeg, so no need to install ffmpeg in our system
import ffmpegPath from 'ffmpeg-static'

//need to tell fluent-ffmpeg that where is the actual ffmpeg executable
ffmpeg.setFfmpegPath(ffmpegPath)


//converts local video file into HLS playlist and segment
//inputFilePath => local path where original video is downloaded.
//hlsOutputDir =>  where hls files will be generated 

export const transcodeVideoToHls = async ({ inputFilePath, hlsOutputDir }) => {

    //master.m3u8 -> hls playlist file
    //segment_%03d.ts -> pattern of video chunks
    const masterPlaylistPath = path.join(hlsOutputDir, 'master.m3u8')
    const segmentPath = path.join(hlsOutputDir, 'segment_%03d.ts')

    // Run ffmpeg and wait till hls files are created.
    await new Promise((resolve, reject) => {
        ffmpeg(inputFilePath) //take path of original video file
            .outputOptions(
                '-preset',
                'veryfast',
                '-hls_time',
                '6',
                '-hls_playlist_type',
                'vod',
                '-hls_segment_filename',
                segmentPath
            )
            .output(masterPlaylistPath) //where playing file going to be created
            .on('end', resolve)
            .on('error', reject)
            .run()
    })

    return {
        masterPlaylistPath
    }

}

