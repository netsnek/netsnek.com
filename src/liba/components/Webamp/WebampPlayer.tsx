import React, {useEffect, useRef, useState} from 'react'
import useWebamp from './useWebamp'
import {Box, Flex, Heading, Image, SimpleGrid, scaleFadeConfig} from '@chakra-ui/react'
import { Track } from 'webamp'

const WebampPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const {initWebamp, webampCI} = useWebamp()

  const handleStop = () => {
    if (webampCI) {
      webampCI.stop()
    }
  }

  const handleChangeTrack = (trackList: Track[]) => {
    if (webampCI) {
      webampCI.setTracksToPlay(trackList)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      initWebamp(containerRef.current, {
        //initialSkin: {url: ''},
        initialTracks: [],
        // Add any other options here
      })
    }
  }, [initWebamp])

  return (
    <Box w={'full'}>
      {/* <Heading>Rezepte zum Anhören</Heading> */}
      <Flex
        direction={{base: 'column', lg: 'row'}}
        justifyContent={'center'}
        alignItems={'center'}
        w={'full'}
        borderRadius="lg"
        // border={'solid black 5px'}
        >
        {/* <Box h="500px" w="300px">
          <Image
            _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
            transition={'all 0.2s ease-in-out'}
            w="100px"
            h="100px"
            borderRadius="xl"
            boxShadow="lg"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a6c7bfd-5077-4305-b83f-5a14ec4d6816/d7f8ilm-29f698ee-5cc5-41db-a851-c13947c376cc.png/v1/fit/w_828,h_746/rainbow_dash_is_too_cool_for_this_upload_by_dasduriel_d7f8ilm-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQwMCIsInBhdGgiOiJcL2ZcLzFhNmM3YmZkLTUwNzctNDMwNS1iODNmLTVhMTRlYzRkNjgxNlwvZDdmOGlsbS0yOWY2OThlZS01Y2M1LTQxZGItYTg1MS1jMTM5NDdjMzc2Y2MucG5nIiwid2lkdGgiOiI8PTYwMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GUuYmQ4c3cTMIvdd5ZH5a0QIkmCLWHm4lE0WSEVYqpk"
            onClick={handleChangeTrack}
          />
        </Box> */}
        <SimpleGrid m="4" minChildWidth='170px' spacing='40px'>
          <Image
            _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
            transition={'all 0.2s ease-in-out'}
            borderRadius="xl"
            boxShadow="lg"
            src="images/9.jpg"
            onClick={() => handleChangeTrack([
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 4'
                },
                url: 'music/rf4.mp3'
              }
            ])}
          />
          <Image
            _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
            transition={'all 0.2s ease-in-out'}
            borderRadius="xl"
            boxShadow="lg"
            src="images/0.jpg"
            onClick={() => handleChangeTrack([
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 5'
                },
                url: 'music/rf5.mp3'
              },
            ])}
          />
          <Image
            _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
            transition={'all 0.2s ease-in-out'}
            borderRadius="xl"
            boxShadow="lg"
            src="images/10.jpg"
            onClick={() => handleChangeTrack([
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 6'
                },
                url: 'music/rf6.mp3'
              },
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 7'
                },
                url: 'music/rf7.mp3'
              }
            ])}
          />
          <Image
            _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
            transition={'all 0.2s ease-in-out'}
            borderRadius="xl"
            boxShadow="lg"
            src="images/15.jpg"
            onClick={() => handleChangeTrack([
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 1'
                },
                url: 'music/rf1.mp3'
              },
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 2'
                },
                url: 'music/rf2.mp3'
              },
              {
                metaData: {
                  artist: 'Royalty Free Music',
                  title: 'Royalty Free Music 3'
                },
                url: 'music/rf3.mp3'
              }
            ])}
          />
        </SimpleGrid>
        <Box position="relative" ref={containerRef} h="410px" minW="275px" my="16" mx="10" 
        transform={"scale(1.2)"}
        >
          {/* Add any custom UI elements for the Webamp player */}
        </Box>
      </Flex>
    </Box>
  )
}

export default WebampPlayer
